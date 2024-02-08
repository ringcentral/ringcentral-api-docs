<?php
require('vendor/autoload.php');

// Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( "SANDBOX-APP-CLIENTID", "SANDBOX-APP-CLIENTSECRET", "https://platform.devtest.ringcentral.com" );
$platform = $rcsdk->platform();

/* Authenticate a user using a personal JWT token */
try {
  $platform->login(["jwt" => "SANDBOX-JWT"]);
}catch (\RingCentral\SDK\Http\ApiException $e) {
  // Getting error messages using PHP native interface
  print 'Expected HTTP Error: ' . $e;
  exit ("Error message: " . $e->apiResponse->response()->error() . PHP_EOL;
}
