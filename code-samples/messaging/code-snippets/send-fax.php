<?php
send_fax();

/*
* Send a high resolution fax message to a recipient number
*/
function send_fax(){
  global $platform, $rcsdk, $RECIPIENT;
  try {
    $bodyParams = $rcsdk->createMultipartBuilder()
        ->setBody(array(
          'to' => array(array('phoneNumber' => $RECIPIENT)),
          // To send fax to multiple recipients, add more 'phoneNumber' object. E.g.
          /*
          'to' => array(
             array('phoneNumber' => "Recipient1-Phone-Number"),
             array('phoneNumber' => "Recipient2-Phone-Number")
          ),
          */
          'faxResolution' => "High",
        ))
        ->add(fopen('test.jpg', 'r'))
        ->request('/restapi/v1.0/account/~/extension/~/fax');

    $resp = $platform->sendRequest($bodyParams);
    print_r ("FAX sent. Message id: " . $resp->json()->id);
    check_fax_message_status($resp->json()->id);
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'Expected HTTP Error: ' . $e;
    print '  Message: ' . $e->apiResponse->response()->error() . PHP_EOL;
  }
}

/*
 Check the sending message status until it's out of the queued status
*/
function check_fax_message_status($messageId){
  global $platform;
  try {
      $endpoint = "/restapi/v1.0/account/~/extension/~/message-store/".$messageId;
      $resp = $platform->get($endpoint);
      $jsonObj = $resp->json();
      print("Message status: " . $jsonObj->messageStatus . PHP_EOL);
      if ($jsonObj->messageStatus == "Queued"){
        sleep(10);
        check_fax_message_status($jsonObj->id);
      }
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("Message: " . $e->message . PHP_EOL);
  }
}
?>
