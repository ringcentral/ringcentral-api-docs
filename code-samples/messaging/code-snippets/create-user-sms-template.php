<?php
create_user_sms_template();

/*
  Create a personal reusable SMS template
*/
function create_user_sms_template(){
  global $platform;
  try {
    $bodyParams = array(
      'displayName' => "Weekly meeting reminder",
      'body' => array(
        'text' => "Please update your slides before the meeting."
        )
    );
    $endpoint = "/restapi/v1.0/account/~/extension/~/message-store-templates";
    $resp = $platform->post($endpoint, $bodyParams);
    $jsonObj = $resp->json();
    print_r (json_encode($jsonObj, JSON_PRETTY_PRINT) . PHP_EOL);
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("Unable to create a user SMS template. " . $e->getMessage() . PHP_EOL);
  }
}

/*
  List personal reusable SMS templates
*/
function list_user_sms_template() {
  global $platform;
  try {
    $endpoint = "/restapi/v1.0/account/~/extension/~/message-store-templates";
    $resp = $platform->get($endpoint);
    $jsonObj = $resp->json();
    print_r (json_encode($jsonObj, JSON_PRETTY_PRINT) . PHP_EOL);
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("Unable to list user SMS templates. " . $e->getMessage() . PHP_EOL);
  }
}
?>
