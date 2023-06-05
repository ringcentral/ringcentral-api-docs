<?php
read_extension_phone_number_detect_a2psms_feature();

/*
  Read phone number(s) that belongs to the authenticated user and detect if a phone number
  has the A2P SMS capability
*/
function read_extension_phone_number_detect_a2psms_feature(){
  global $platform;
  $endpoint = "/restapi/v1.0/account/~/extension/~/phone-number";
  $resp = $platform->get($endpoint);
  $jsonObj = $resp->json();
  foreach ($resp->json()->records as $record){
    if ($record->usageType == "DirectNumber"){
      foreach ($record->features as $feature){
        if ($feature == "A2PSmsSender"){
          // If a user has multiple phone numbers, check and decide which number
          // to be used for sending batch message.
          return send_batch_sms($record->phoneNumber);
        }
      }
    }
  }
  if (count($jsonObj->records) == 0)
    exit("This user does not own a phone number!");
  else
    exit("None of this user's phone number(s) has the A2P SMS capability!");
}

/*
 Broadcast a text message from a user own phone number to multiple recipients
*/
function send_batch_sms($fromNumber) {
  global $platform, $RECIPIENT;
  try {
    $bodyParams = array(
      'from' => $fromNumber,
      'text' => "Hello Team",
      'messages' => array(
        array ('to' => array ($RECIPIENT))
        // Adding more recipients
        /*
        array ('to' => array ("Recipient-2-Phone-Number")),
        array ('to' => array ("Recipient-N-Phone-Number"))
        */
    ));
    $endpoint = "/restapi/v1.0/account/~/a2p-sms/batches";
    $resp = $platform->post($endpoint, $bodyParams);
    check_batch_status($resp->json()->id);
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("Message: " . $e->message . PHP_EOL);
  }
}

/*
 Send a batch from a user own phone number to multiple recipient with personalized message
*/
function send_personalized_sms($fromNumber) {
  global $platform, $RECIPIENT;
  try {
    $bodyParams = array(
      'from' => $fromNumber,
      // This text becomes the default text and can be obmitted, if the text in a recipient object is not specified, this text will be used
      'text' => "Hello Team",
      'messages' => array(
        array ('to' => array ($RECIPIENT), 'text' => "Hello Alice")
        // Adding more recipients
        /*
        array ('to' => array ("Recipient-2-Phone-Number"), 'text' => "Hello Bob"),
        array ('to' => array ("Recipient-N-Phone-Number"), 'text' => "Hola Maria")
        */
    ));
    $endpoint = "/restapi/v1.0/account/~/a2p-sms/batches";
    $resp = $platform->post($endpoint, $bodyParams);
    check_batch_status($resp->json()->id);
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("Message: " . $e->message . PHP_EOL);
  }
}

/*
 Check the batch status until it's completed.
 Sending a large batch will take some time for the server to complete. You can read a batch status using the batch id returned in the response after sending a batch.
*/
function check_batch_status($batchId) {
  global $platform;
  try {
      $endpoint = "/restapi/v1.0/account/~/a2p-sms/batches/".$batchId;
      $resp = $platform->get($endpoint);
      $jsonObj = $resp->json();
      print("Batch status: " . $jsonObj->status . PHP_EOL);
      if ($jsonObj->status != "Completed"){
        sleep(5);
        check_batch_status($jsonObj->id);
      }else{
        print_r (json_encode($jsonObj, JSON_PRETTY_PRINT) . PHP_EOL);
      }
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("Message: " . $e->message . PHP_EOL);
  }
}
?>
