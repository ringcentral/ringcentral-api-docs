<?php
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$CLIENTID     = $_ENV['RC_CLIENT_ID'];
$CLIENTSECRET = $_ENV['RC_CLIENT_SECRET'];
$SERVER       = $_ENV['RC_SERVER_URL'];
$USERNAME     = $_ENV['RC_USERNAME'];
$PASSWORD     = $_ENV['RC_PASSWORD'];
$EXTENSION    = $_ENV['RC_EXTENSION'];

$rcsdk = new RingCentral\SDK\SDK($CLIENTID, $CLIENTSECRET, $SERVER);
$platform = $rcsdk->platform();
$platform->login($USERNAME, $EXTENSION, $PASSWORD);

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