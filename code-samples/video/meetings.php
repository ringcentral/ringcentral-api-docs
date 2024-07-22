<?php
// Remember to modify the path ./../ pointing to the location where the RingCentral SDK was installed and the .env file was saved!
require('./../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

# Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_APP_CLIENT_ID'],
                                  $_ENV['RC_APP_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();

// Authenticate a user using a personal JWT token
try {
  $platform->login( [ "jwt" => $_ENV['RC_USER_JWT'] ] );
  create_meeting();
} catch (\RingCentral\SDK\Http\ApiException $e) {
  exit("Unable to authenticate to platform. Check credentials. " . $e->message . PHP_EOL);
}

/*
* Create an instant RCV meeting
*/
function create_meeting(){
  global $platform;
  $endpoint = "/rcvideo/v2/account/~/extension/~/bridges";
  $bodyParams = array(
      'name' => "Test Meeting",
      'type' => "Instant"
  );
  try {
    $resp = $platform->post($endpoint, $bodyParams);
    print_r ('Start Your Meeting: ' . $resp->json()->discovery->web . PHP_EOL);
  } catch (Exception $e) {
    print_r ("Unable to create an instant RCV meeting. " . $e->getMessage() . PHP_EOL);
  }
}
