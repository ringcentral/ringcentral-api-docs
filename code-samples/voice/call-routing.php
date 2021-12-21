<?php
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$CLIENTID     = $_ENV['RC_CLIENT_ID'];
$CLIENTSECRET = $_ENV['RC_CLIENT_SECRET'];
$SERVER       = $_ENV['RC_SERVER_URL'];
$USERNAME     = $_ENV['RC_USERNAME'];
$PASSWORD     = $_ENV['RC_PASSWORD'];
$EXTENSION    = $_ENV['RC_EXTENSION'];

$rcsdk = new RingCentral\SDK\SDK($CLIENTID, $CLIENTSECRET, $SERVER);
$platform = $rcsdk->platform();
$platform->login($USERNAME, $EXTENSION, $PASSWORD);

try {
    $resp = $platform->get('/account/~/extension/~/answering-rule',
	array(
	    'view' => "Detailed",
	    'enabledOnly' => False
	));
    $jsonObj = $resp->json();
    foreach ($jsonObj->records as $record){
	// use the $record->id to read rule details
	$resp = $platform->get('/account/~/extension/~/answering-rule/' . $record->id );
	print_r($resp->text()."\n");
    }
} catch (Exception $e) {
    echo $e->getMessage()."\n";
}
?>
