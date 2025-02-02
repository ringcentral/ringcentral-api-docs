<?php
require('vendor/autoload.php');

// Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( "RC_APP_CLIENT_ID", "RC_APP_CLIENT_SECRET", "https://platform.ringcentral.com" );
$platform = $rcsdk->platform();

/* Authenticate a user using a personal JWT token */
try {
  $platform->login(["jwt" => "RC_USER_JWT"]);
}catch (\RingCentral\SDK\Http\ApiException $e) {
  // Getting error messages using PHP native interface
  print 'Expected HTTP Error: ' . $e;
  exit ("Error message: " . $e->apiResponse->response()->error() . PHP_EOL;
}

// For the purpose of testing the code, we put the recipient number in the variable.
// Feel free to set the recipient number directly.
$RECIPIENT = "RECIPIENT-PHONE-NUMBER";
