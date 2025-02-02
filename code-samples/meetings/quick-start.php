<?php
r// Remember to modify the path ./../ pointing to the location where the RingCentral SDK was installed and the .env file was saved!
require('./../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . './../');
$dotenv->load();

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_APP_CLIENT_ID'],
                                  $_ENV['RC_APP_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_USER_JWT'] ] );

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
