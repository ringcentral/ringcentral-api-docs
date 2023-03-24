<?php
/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */
   
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

$params = array (
    'enabled' => true,
    'type' => "Custom",
    'name' => "My weekly meetings",
    'schedule' => array (
      'weeklyRanges' => array (
	'monday' => array ( array ('from' => "09:00", 'to' => "10:00")),
	'friday' => array ( array ('from' => "10:00", 'to' => "15:00"))
      )
    ),
    'callHandlingAction' => "TakeMessagesOnly"
);
$resp = $platform->post('/account/~/extension/~/answering-rule', $params);

print_r ($resp->text());
?>