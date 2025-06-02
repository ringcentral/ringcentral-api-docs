<?php

set_user_fac_state_schedule();

/*
* Set user forward-all-calls state schedule
*/
function set_user_fac_state_schedule() {
  global $platform;
  try {
    $bodyParams = array (
      "enabled" => true,
      "conditions" => array(
        array (
          "type" => "Schedule",
          "schedule" => array (
            "triggers" => array (
              array (
                "triggerType" => "Range",
                "ranges" => array (
                  array (
                    "startDateTime" => "2025-07-04T00:00:00",
                    "endDateTime" => "2025-07-05T08:00:00"
                  )
                )
              )
            )
          )
        )
      )
    );
    $endpoint = "/restapi/v2/accounts/~/extensions/~/comm-handling/states/forward-all-calls";
    $resp = $platform->put($endpoint, $bodyParams);
    print_r ($resp->json());
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'HTTP Error: ' . $e->getMessage() . PHP_EOL;
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print 'Unable to set user FAC state schedule. ' . $e->apiResponse->response()->error() . PHP_EOL;
  }
}
?>
