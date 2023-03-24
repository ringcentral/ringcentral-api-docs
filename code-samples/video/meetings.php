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

$params = array(
    'name' => 'Test Meeting'
);

try {
  $resp = $platform->post('/rcvideo/v2/account/~/extension/~/bridges', $params);
  print_r ('Start Your Meeting: ' . $resp->json()->web->discovery . "\n");
} catch (Exception $e) {
  print_r ("An error occurred: " . $e->getMessage() . "\n");
}
