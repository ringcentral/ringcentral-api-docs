<?php
read_extension_phone_number_detect_mms_feature();

/*
  Read phone number(s) that belongs to the authenticated user and detect if a phone number
  has the SMS capability
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
          // to be used for sending the message batch.
          return send_batch_mms($record->phoneNumber);
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
 Broadcast a text message from a user own phone number to multiple recipients
*/
function send_batch_mms($fromNumber) {
  global $platform, $rcsdk;
  try {
    $bodyParams = [
        "from" => [ "phoneNumber" => $fromNumber ],
        "text" => "Introducing our new WinterFlex Jacket! Stay warm and stylish this season. Enjoy 20% off this week only. Shop now!",
        "messages" => [
                [ "to" => [ ["phoneNumber" => "Recipient-1"] ] ],
                [ "to" => [ ["phoneNumber" => "Recipient-2"] ] ],
                [ "to" => [ ["phoneNumber" => "Recipient-3"] ] ]
              ]
            ];
    $endpoint = "/restapi/v2/accounts/~/extensions/~/sms/batches";
    $request = $rcsdk->createMultipartBuilder()
        // Add the bodyParams to multipart request
        ->setBody( $bodyParams )
        // Attach a media file to multipart request
        ->add(fopen(__DIR__.'/winterflex-jacket.png', 'r'))
        ->request($endpoint);

    $resp = $platform->sendRequest($request);
    $jsonObj = $resp->json();
    print_r (json_encode($jsonObj, JSON_PRETTY_PRINT) . PHP_EOL);
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("Message: " . $e->message . PHP_EOL);
  }
}
?>
