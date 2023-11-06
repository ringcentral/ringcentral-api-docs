<?php
/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */
   
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

use RingCentral\SDK\WebSocket\WebSocket;
use RingCentral\SDK\WebSocket\Subscription;
use RingCentral\SDK\WebSocket\Events\NotificationEvent;

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

$websocket = $rcsdk->initWebSocket();
$websocket->connect();

$subscription = $rcsdk->createSubscription();
$subscription->addEvents(array('/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'));
$subscription->addListener(Subscription::EVENT_NOTIFICATION, function (NotificationEvent $e) {
    print 'Notification ' . print_r($e->payload(), true) . PHP_EOL;
});
$subscription->register();
?>
