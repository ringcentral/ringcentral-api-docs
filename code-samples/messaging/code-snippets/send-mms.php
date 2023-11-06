<?php
read_extension_phone_number_detect_mms_feature();

/*
  Read phone number(s) that belongs to the authenticated user and detect if a phone number
  has the MMS capability
*/
function read_extension_phone_number_detect_mms_feature(){
  global $platform;
  $endpoint = "/restapi/v1.0/account/~/extension/~/phone-number";
  $resp = $platform->get($endpoint);
  $jsonObj = $resp->json();
  foreach ($resp->json()->records as $record){
    if ($record->usageType == "DirectNumber"){
      foreach ($record->features as $feature){
        if ($feature == "MmsSender"){
          // If a user has multiple phone numbers, check and decide which number
          // to be used for sending MMS message.
          return send_mms($record->phoneNumber);
        }
      }
    }
  }
  if (count($jsonObj->records) == 0)
    exit("This user does not own a phone number!");
  else
    exit("None of this user's phone number(s) has the MMS capability!");
}

/*
 Send a multi-media message from a user own phone number to a recipient number
*/
function send_mms($fromNumber){
  global $platform, $rcsdk, $RECIPIENT;
  try {
    $bodyParams = array(
      'from' => array( 'phoneNumber' => $fromNumber ),
      'to'   => array( array('phoneNumber' => $RECIPIENT ) ),
      // To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
      /*
      'to' => array(
         array('phoneNumber' => "Recipient1-Phone-Number"),
         array('phoneNumber' => "Recipient2-Phone-Number")
      ),
      */
      'text' => 'Hello World'
    );

    $endpoint = "/restapi/v1.0/account/~/extension/~/mms";
    $request = $rcsdk->createMultipartBuilder()
        // Add the bodyParams to multipart request
        ->setBody( $bodyParams )
        // Attach a media file to multipart request
        ->add(fopen(__DIR__.'/test.jpg', 'r'))
        ->request($endpoint);

    $resp = $platform->sendRequest($request);
    print_r ("MMS sent. Message id: " . $resp->json()->id . PHP_EOL);
    check_mms_message_status($resp->json()->id);
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'Expected HTTP Error: ' . $e;
    print '  Message: ' . $e->apiResponse->response()->error() . PHP_EOL;
  }
}

/*
 Check the sending message status until it's out of the queued status
*/
function check_mms_message_status($messageId){
  global $platform;
  try {
      $endpoint = "/restapi/v1.0/account/~/extension/~/message-store/".$messageId;
      $resp = $platform->get($endpoint);
      $jsonObj = $resp->json();
      print("Message status: " . $jsonObj->messageStatus . PHP_EOL);
      if ($jsonObj->messageStatus == "Queued"){
        sleep(5);
        check_mms_message_status($jsonObj->id);
      }
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("Message: " . $e->message . PHP_EOL);
  }
}
?>
