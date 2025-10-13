<?php

read_user_workhours_state_rules();

/*
* Read existing rules
*/
function read_user_workhours_state_rules() {
  global $platform;
  try {
    $endpoint = "/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours";
    $resp = $platform->get($endpoint);
    update_user_workhours_state_rules($resp->json()->dispatching);
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'HTTP Error: ' . $e->getMessage() . PHP_EOL;
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print "Unable to read user Work-Hours state rules. " . $e->apiResponse->response()->error() . PHP_EOL;
  }
}

/*
* Update the Work-Hours state rules with new values
*/
function update_user_workhours_state_rules($dispatching){
  global $platform;
  try {
    // new phone number forwarding target
    $newTarget = [
        "type" => "RingGroupAction",
        "enabled" => true,
        "targets" => [
          [
            "type" => "PhoneNumberRingTarget",
            "destination" => [
                "phoneNumber" => "+13121234567"
            ],
            "name" => "Temporary number"
          ]
        ],
        "duration" => 25 // 5 rings
    ];
    array_unshift($dispatching->actions, $newTarget);
    $bodyParams = array( 'dispatching' =>  $dispatching );
    $endpoint = "/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours";
    $resp = $platform->patch($endpoint, $bodyParams);
    print_r ($resp->json());
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'HTTP Error: ' . $e->getMessage() . PHP_EOL;
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print "Unable to update user Work-Hours state rules. " . $e->apiResponse->response()->error() . PHP_EOL;
  }
}
?>
