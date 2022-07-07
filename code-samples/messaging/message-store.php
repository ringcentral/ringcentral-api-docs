<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

$response = $platform->get('/account/~/extension/~/message-store',
    array(
      'messageType' => array('SMS')
    ));
print_r ($response->text());
?>