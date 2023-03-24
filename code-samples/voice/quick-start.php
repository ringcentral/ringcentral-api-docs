<?php
/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */
   
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$CALLER       = $_ENV['RINGOUT_CALLER'];
$RECIPIENT    = $_ENV['RINGOUT_RECIPIENT'];

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

$resp = $platform->post('/account/~/extension/~/ring-out',
    array(
      'from' => array('phoneNumber' => $CALLER ),
      'to' => array('phoneNumber' => $RECIPIENT),
      'playPrompt' => false
    ));

print_r ("Call placed. Call status: " . $resp->json()->status->callStatus);
?>
