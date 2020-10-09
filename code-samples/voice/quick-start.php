<?php
require('vendor/autoload.php');

$RECIPIENT = '<ENTER PHONE NUMBER>';

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com';

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

$resp = $platform->post('/account/~/extension/~/ring-out',
    array(
      'from' => array('phoneNumber' => $RINGCENTRAL_USERNAME),
      'to' => array('phoneNumber' => $RECIPIENT),
      'playPrompt' => false
    ));

print_r ("Call placed. Call status: " . $resp->json()->status->callStatus);
?>
