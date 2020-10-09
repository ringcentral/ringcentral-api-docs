<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

$params = array (
    'enabled' => true,
    'type' => "Custom",
    'name' => "My weekly meetings",
    'schedule' => array (
      'weeklyRanges' => array (
      	'monday' => array ( array ('from' => "09:00", 'to' => "10:00")),
        'friday' => array ( array ('from' => "10:00", 'to' => "15:00"))
      )
    ),
    'callHandlingAction' => "TakeMessagesOnly"
);
$resp = $platform->post('/account/~/answering-rule', $params);

print_r ($resp->text());
?>