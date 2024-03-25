<?php
require('vendor/autoload.php');

// Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( 'PRODUCTION-APP-CLIENTID', 'PRODUCTION-APP-CLIENTSECRET', 'https://platform.ringcentral.com' );
$platform = $rcsdk->platform();

/* Authenticate a user using a personal JWT token */
$platform->login(["jwt" => 'PRODUCTION-JWT']);
?>
