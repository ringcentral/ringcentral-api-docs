<?php
require('vendor/autoload.php');

// Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( 'RC_APP_CLIENT_ID', 'RC_APP_CLIENT_SECRET', 'https://platform.ringcentral.com' );
$platform = $rcsdk->platform();

/* Authenticate a user using a personal JWT token */
$platform->login(["jwt" => 'RC_USER_JWT']);
?>
