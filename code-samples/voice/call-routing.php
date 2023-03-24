<?php
/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */
   
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

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
