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
    'phoneNumber' => '11235557890',
    'type' => 'Other',
    'label' => 'My ATT number'
);
$resp = $platform->post('/account/~/extension/~/forwarding-number', $params);

print_r ("Forwarding number created.");
print_r ($resp->json()->id);
?>