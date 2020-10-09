<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

$params = array (
    'phoneNumber' => '11235557890',
    'type' => 'Other',
    'label' => 'My ATT number'
);
$resp = $platform->post('/account/~/extension/~/forwarding-number', $params);

print_r ("Forwarding number created.");
print_r ($resp->json()->id);
?>