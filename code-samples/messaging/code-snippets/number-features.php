<?php
detect_sms_feature();

/*
  Read phone number(s) that belongs to the authenticated user and detect if a phone number
  has the SMS capability
*/
function detect_sms_feature(){
  global $platform;
  $endpoint = "/restapi/v1.0/account/~/extension/~/phone-number";
  $resp = $platform->get($endpoint);
  $jsonObj = $resp->json();
  foreach ($resp->json()->records as $record){
    if ($record->usageType == "DirectNumber"){
      foreach ($record->features as $feature){
        if ($feature == "SmsSender"){
          print_r ("This phone number " . $record->phoneNumber . " has SMS feature\n");
        }
      }
    }
  }
  if (count($jsonObj->records) == 0)
    print_r ("This user does not own a phone number!");
}
