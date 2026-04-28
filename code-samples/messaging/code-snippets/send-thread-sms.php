<?php
read_shared_phone_number_detect_sms_feature();

/*
  Read the shared phone number that currently assigned to the authenticated user and detect if a phone number
  has the SMS capability
*/
function read_shared_phone_number_detect_sms_feature(){
  global $platform;
  $endpoint = "/restapi/v1.0/account/~/extension/~/phone-number";
  $resp = $platform->get($endpoint);
  $jsonObj = $resp->json();
  foreach ($resp->json()->records as $record){
    // Find the "Financial Advising Queue" call queue's direct phone number
    if (isset($record['extension']) && $record['extension']['name'] === "Financial Advising Queue"){
      foreach ($record->features as $feature){
        if ($feature == "SmsSender"){
          send_thread_message($record->phoneNumber);
          return;
        }
      }
    }
  }
  if (count($jsonObj->records) == 0)
    exit("This user does not own a phone number!");
  else
    exit("None of this user's phone number(s) has the SMS capability!");
}

/*
 Send a thread message to a recipient phone number
*/
function send_thread_message($fromNumber) {
  global $platform, $RECIPIENT;
  try {
    $bodyParams = [
        "from" => [ "phoneNumber" => $fromNumber ],
        "to" => [ ["phoneNumber" => "Recipient-1"] ],
        "text" => "Hi Tom ...",
        ];

    $endpoint = "/restapi/v1.0/account/~/message-threads/messages";
    $resp = $platform->post($endpoint, $bodyParams);
    $jsonObj = $resp->json();
    print_r (json_encode($jsonObj, JSON_PRETTY_PRINT) . PHP_EOL);
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("Message: " . $e->message . PHP_EOL);
  }
}
?>
