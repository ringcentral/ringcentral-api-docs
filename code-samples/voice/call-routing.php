<?php
require('vendor/autoload.php');

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com';

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

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
