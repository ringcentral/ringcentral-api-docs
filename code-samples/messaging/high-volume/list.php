<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

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