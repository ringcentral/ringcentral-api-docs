<?php
// Remember to modify the path ./../ pointing to the location where the RingCentral SDK was installed and the .env file was saved!
require('./../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . './../');
$dotenv->load();

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_APP_CLIENT_ID'],
                                  $_ENV['RC_APP_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );

$platform = $rcsdk->platform();

// Authenticate a user using a personal JWT token
try {
  $platform->login( [ "jwt" => $_ENV['RC_USER_JWT'] ] );
  call_ring_out();
} catch (\RingCentral\SDK\Http\ApiException $e) {
  exit("Unable to authenticate to platform. Check credentials. " . $e->getMessage() . PHP_EOL);
}

/*
* Place a ring-out call
*/
function call_ring_out(){
  global $platform;
  $CALLER       = $_ENV['RINGOUT_CALLER'];
  $RECIPIENT    = $_ENV['RINGOUT_RECIPIENT'];

  try {
    $bodyParams = array(
      'from' => array('phoneNumber' => $CALLER ),
      'to' => array('phoneNumber' => $RECIPIENT),
      'playPrompt' => false
    );
    $endpoint = "/account/~/extension/~/ring-out";
    $resp = $platform->post($endpoint, $bodyParams);
    print_r ("Call placed. Call status: " . $resp->json()->status->callStatus);
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'HTTP Error: ' . $e->getMessage() . PHP_EOL;
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print 'Unable to place a ring-out call. ' . $e->apiResponse->response()->error() . PHP_EOL;
  }
}
?>


<?php
/**********************************************************
 Code snippet section for boostrap testing purpose
**********************************************************/
boostrap_test_function();
function boostrap_test_function(){

  sleep(2);
  print_r ("Test code snippets". PHP_EOL);
  //require_once (__DIR__ .'/code-snippets/create-update-call-monitoring-group.php');
  // sleep(2);
  // print_r ("Test fetching stt task status". PHP_EOL);
  // require_once (__DIR__ .'/code-snippets/create-update-call-monitoring-group.php');
  //
  // sleep(2);
  // print_r ("Test list call monitoring group". PHP_EOL);
  //require_once (__DIR__ .'/code-snippets/call-monitoring-group.php');
  // require_once (__DIR__ .'/code-snippets/call-supervision.php');

  // require_once (__DIR__ .'/code-snippets/change-fac-state-call-terminating-rules.php');
  // require_once (__DIR__ .'/code-snippets/set-fac-state-schedule.php');

  require_once (__DIR__ .'/code-snippets/create-interaction-rule.php');
}
?>
