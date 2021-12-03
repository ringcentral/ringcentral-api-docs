<?php
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$RECIPIENT    = $_ENV['RINGOUT_RECIPIENT'];

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( $_ENV['RC_USERNAME'],
                  $_ENV['RC_EXTENSION'],
                  $_ENV['RC_PASSWORD'] );

$resp = $platform->post('/account/~/extension/~/ring-out',
    array(
      'from' => array('phoneNumber' => $_ENV['RC_USERNAME'] ),
      'to' => array('phoneNumber' => $RECIPIENT),
      'playPrompt' => false
    ));

print_r ("Call placed. Call status: " . $resp->json()->status->callStatus);
?>
