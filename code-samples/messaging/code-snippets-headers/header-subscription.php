<?php
require('vendor/autoload.php');

use RingCentral\SDK\WebSocket\WebSocket;
use RingCentral\SDK\WebSocket\Subscription;
use RingCentral\SDK\WebSocket\Events\NotificationEvent;

// Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( "RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com" );
$platform = $rcsdk->platform();

/* Authenticate a user using a personal JWT token */
try {
  $platform->login(["jwt" => "RC_USER_JWT"]);
}catch (\RingCentral\SDK\Http\ApiException $e) {
  exit("Unable to authenticate to platform. Check credentials. " . $e->message . PHP_EOL);
}
?>
