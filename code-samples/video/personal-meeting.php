<?php
/* You get the environment parameters from your
   application dashbord in your developer account
   https://developers.ringcentral.com */

require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_APP_CLIENT_ID'],
                                  $_ENV['RC_APP_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_USER_JWT'] ] );

get_personal_meeting_url();

function get_personal_meeting_url(){
  global $platform;
  $resp = $platform->get("/rcvideo/v2/account/~/extension/~/bridges/default");
  $jsonObj = $resp->json();
  print("Your personal meeting URL is: " . $resp->json()->discovery->web . PHP_EOL);
}
?>
