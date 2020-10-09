<?php
require('vendor/autoload.php');

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
$RINGCENTRAL_SERVER = 'https://platform.ringcentral.com';

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

$params = array(
    'topic' => 'Test Meeting',
    'meetingType' => 'Instant',
    'allowJoinBeforeHost' => true,
    'startHostVideo' => true,
    'startParticipantsVideo' => false
    );
try {
  $resp = $platform->post('/account/~/extension/~/meeting', $params);
  print_r ('Start Your Meeting: ' . $resp->json()->links->startUri . "\n");
  print_r ('Join the Meeting: ' . $resp->json()->links->joinUri . "\n");
} catch (Exception $e) {
  print_r ("An error occurred: " . $e->getMessage() . "\n");
}
