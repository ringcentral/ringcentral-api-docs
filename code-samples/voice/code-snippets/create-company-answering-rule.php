<?php

create_company_custom_answering_rule();

/*
* Create a company custom answering rule
*/
function create_company_custom_answering_rule() {
  global $platform;
  try {
    $bodyParams = [
          "enabled" => true,
          "type" => "Custom",
          "name" => "New Year Holiday",
          "schedule" => [
              "ranges" => [
                  [
                      "from" => "2025-12-31T17:00:00.00Z",
                      "to" => "2026-01-02T08:00:00.00Z"
                  ]
              ]
          ],
          "callHandlingAction" => "Bypass",
          "extension" => [
              "id" => "62952481016" // ID of an announcement-only extension
          ]
      ];
    $endpoint = "/restapi/v1.0/account/~/answering-rule";
    $resp = $platform->post($endpoint, $bodyParams);
    print_r ($resp->json());
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'HTTP Error: ' . $e->getMessage() . PHP_EOL;
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print "Unable to create a company custom answering rule. " . $e->apiResponse->response()->error() . PHP_EOL;
  }
}
?>
