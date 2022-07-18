<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );
$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

$response = $platform->get('/account/~/extension/~/phone-number');
foreach ($response->json()->records as $record){
	foreach ($record->features as $feature){
		if ($feature == "A2PSmsSender"){
			if ($record->paymentType == "TollFree")
				print_r ("This phone number ".$record->phoneNumber." is a toll-free number and provisioned for using to send high volume SMS\n");
			else
				print_r ("This phone number ".$record->phoneNumber." is a 10-DLC local number and provisioned for using to send high volume SMS\n");
		}
	}
}
?>