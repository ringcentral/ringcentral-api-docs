<?php

read_user_fac_state_rules();

/*
* Read existing rules
*/
function read_user_fac_state_rules() {
  global $platform;
  try {
    $endpoint = "/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls";
    $resp = $platform->get($endpoint);
    update_user_fac_state_rules($resp->json()->dispatching);
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'HTTP Error: ' . $e->getMessage() . PHP_EOL;
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print "Unable to read user FAC state rules. " . $e->apiResponse->response()->error() . PHP_EOL;
  }
}

/*
* Update rules with new values
*/
function update_user_fac_state_rules($dispatching){
  global $platform;
  try {
    // Find the "TerminatingAction" object from the dispatching actions list
    foreach ($dispatching->actions as $action) {
      if (isset($action->type) && $action->type === "TerminatingAction") {
        // Change the terminating target type
        $action->terminatingTargetType = "PlayAnnouncementTerminatingTarget";

        $bodyParams = array( 'dispatching' =>  $dispatching );
        $endpoint = "/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls";
        $resp = $platform->patch($endpoint, $bodyParams);
        print_r ($resp->json());
        break;
      }
    }
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'HTTP Error: ' . $e->getMessage() . PHP_EOL;
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print "Unable to update user FAC state rules. " . $e->apiResponse->response()->error() . PHP_EOL;
  }
}
?>
