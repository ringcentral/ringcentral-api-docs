<?php
require(__DIR__ . 'vendor/autoload.php');

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com';

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

$CHAT_ID = '<GROUP ID>';

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

$endpoint = "/restapi/v1.0/glip/chats/"+CHAT_ID+"/adaptive-cards";
$params = array(
    "type" => "AdaptiveCard",
    "$schema" => "http://adaptivecards.io/schemas/adaptive-card.json",
    "version" => "1.3",
    "body" => array(
    	   array("type" => "TextBlock",
		 "size" => "Medium",
		 "weight" => "Bolder",
		 "text" => "Adaptive Card example"),
    	   array("type" => "Image",
		 "url" => "https://bit.ly/3nwZbRM")));

$resp = $platform->post($endpoint, $params);
print($resp->text());
?>
