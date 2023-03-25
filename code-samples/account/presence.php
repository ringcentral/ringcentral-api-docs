<?php
require('vendor/autoload.php');
$rcsdk = new RingCentral\SDK\SDK("client_id", "client_secret", "server_url");
$platform = $rcsdk->platform();
$platform->login("username", "extension_number", "password");

$resp = $platform->get('/account/~/presence',
    array(
	'detailedTelephonyState' => true
    ));
foreach ($resp->json()->records as $record)
    print_r ($record->userStatus . "\n");