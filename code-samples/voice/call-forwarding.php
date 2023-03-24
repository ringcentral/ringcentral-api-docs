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
    'phoneNumber' => '11235557890',
    'type' => 'Other',
    'label' => 'My ATT number'
);
$resp = $platform->post('/account/~/extension/~/forwarding-number', $params);

print_r ("Forwarding number created.");
print_r ($resp->json()->id);
?>