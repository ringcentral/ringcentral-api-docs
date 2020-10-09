<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

$params = array(
   'view' => 'Simple'
    );
$resp = $platform->get('/account/~/extension/~/active-calls', $params);
foreach ($resp->json()->records as $record) {
    print_r ("Call result: ".$record->result);
}
?>
