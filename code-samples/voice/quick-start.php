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
$RECIPIENT    = $_ENV['RINGOUT_RECIPIENT'];

$rcsdk = new RingCentral\SDK\SDK($CLIENTID, $CLIENTSECRET, $SERVER);
$platform = $rcsdk->platform();
$platform->login($USERNAME, $EXTENSION, $PASSWORD);

$resp = $platform->post('/account/~/extension/~/ring-out',
    array(
      'from' => array('phoneNumber' => $RINGCENTRAL_USERNAME),
      'to' => array('phoneNumber' => $RECIPIENT),
      'playPrompt' => false
    ));

print_r ("Call placed. Call status: " . $resp->json()->status->callStatus);
?>
