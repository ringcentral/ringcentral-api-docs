<?php
require('vendor/autoload.php');

// Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( 'SANDBOX-APP-CLIENTID', 'SANDBOX-APP-CLIENTSECRET', 'https://platform.devtest.ringcentral.com' );
$platform = $rcsdk->platform();

/* Authenticate a user using a personal JWT token */
$platform->login(["jwt" => 'SANDBOX-JWT']);
?>
