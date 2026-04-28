<?php
read_extension_phone_number_detect_sms_feature();

/*
  Read phone number(s) that belongs to the authenticated user and detect if a phone number
  has the SMS capability
*/
function read_extension_phone_number_detect_sms_feature(){
  global $platform;
  $endpoint = "/restapi/v1.0/account/~/extension/~/phone-number";
  $resp = $platform->get($endpoint);
  $jsonObj = $resp->json();
  foreach ($resp->json()->records as $record){
    if ($record->usageType == "DirectNumber"){
      foreach ($record->features as $feature){
        if ($feature == "SmsSender"){
          // If a user has multiple phone numbers, check and decide which number
          // to be used for sending the message batch.
          return send_batch_with_group_messaging($record->phoneNumber);
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
 Send a batch with multiple group messaging. Recipients in the same group will see each other's phone numbers.
*/
function send_batch_with_group_messaging($phoneNumber){
  global $platform;
  try {
    $bodyParams = [
        "from" => [
            "phoneNumber" => $fromNumber
        ],
        "text" => "",
        "messages" => [
            [
                "to" => [
                    ["phoneNumber" => "Recipient-1"],
                    ["phoneNumber" => "Recipient-2"],
                    ["phoneNumber" => "Recipient-3"]
                ],
                "text" => "Work with your group to discuss and complete the assignment A by 1:00 PM."
            ],
            [
                "to" => [
                    ["phoneNumber" => "Recipient-A"],
                    ["phoneNumber" => "Recipient-B"],
                    ["phoneNumber" => "Recipient-C"]
                ],
                "text" => "Work with your group to discuss and complete assignment B by 3:00 PM."
            ],
            [
                "to" => [
                    ["phoneNumber" => "Recipient-X"],
                    ["phoneNumber" => "Recipient-Y"],
                    ["phoneNumber" => "Recipient-Z"]
                ],
                "text" => "Work with your group to discuss and complete the assignment C by 6:00 PM."
            ]
        ]
    ];
    $endpoint = "/restapi/v2/accounts/~/extensions/~/sms/batches";
    $resp = $platform->post($endpoint, $bodyParams);
    $jsonObj = $resp->json();
    print_r (json_encode($jsonObj, JSON_PRETTY_PRINT) . PHP_EOL);
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("Message: " . $e->message . PHP_EOL);
  }
}
?>
