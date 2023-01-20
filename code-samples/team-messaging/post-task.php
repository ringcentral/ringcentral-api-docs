<?php
require(__DIR__ . 'vendor/autoload.php');

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com';

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

$CHAT_ID = '<GROUP ID>';

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID,
                                 $RINGCENTRAL_CLIENTSECRET,
				 $RINGCENTRAL_SERVER);

$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME,
	         $RINGCENTRAL_EXTENSION,
		 $RINGCENTRAL_PASSWORD);

$endpoint = "/team-messaging/v1/chats/"+CHAT_ID+"/notes";
$params = array(
    "subject" => "You need to do X",
    "assignees" => array( "id" => "<ID>" ),
    "description" => "In this task assignees will need to do x, y and z."
);

$resp = $platform->post($endpoint, $params);
print($resp->text());
?>
