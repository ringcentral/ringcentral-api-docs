<?php
require('vendor/autoload.php');

$RECIPIENT = '<ENTER FAX NUMBER>'

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);
$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

$request = $rcsdk->createMultipartBuilder()
    ->setBody(array(
      'to' => array(array('phoneNumber' => $RECIPIENT)),
      'faxResolution' => 'High',
    ))
    ->add(fopen('test.jpg', 'r'))
    ->request('/account/~/extension/~/fax');

$resp = $platform->sendRequest($request);
print_r ("FAX sent. Message status: " . $resp->json()->messageStatus);
