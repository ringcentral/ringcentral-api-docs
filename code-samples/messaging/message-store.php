<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

$response = $platform->get('/account/~/extension/~/message-store',
    array(
      'messageType' => array('SMS')
    ));
print_r ($response->text());
?>