<?php
use RingCentral\SDK\Subscription\Events\NotificationEvent;
use RingCentral\SDK\Subscription\Subscription;

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_APP_CLIENT_ID'],
                                  $_ENV['RC_APP_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_USER_JWT'] ] );

$subscription = $rcsdk->createSubscription('Pubnub');
$subscription->addEvents(array('/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'));
$subscription->addListener(Subscription::EVENT_NOTIFICATION, function (NotificationEvent $e) {
    print 'Notification ' . print_r($e->payload(), true) . PHP_EOL;
});
$subscription->setKeepPolling(true);
$subscription->register();
?>
