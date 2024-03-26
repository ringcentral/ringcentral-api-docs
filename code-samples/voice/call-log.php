<?php
// Remember to modify the path ./../ pointing to the location where the RingCentral SDK was installed and the .env file was saved!
require('./../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . './../');
$dotenv->load();

# Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();

// Authenticate a user using a personal JWT token
try {
  $platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );
  read_user_calllog();
} catch (\RingCentral\SDK\Http\ApiException $e) {
  exit("Unable to authenticate to platform. Check credentials. " . $e->message . PHP_EOL);
}

/*
*  Read user call log between a period of time
*/
function read_user_calllog() {
  global $platform;
  try{
    $queryParams = array(
      'dateFrom' => "2024-01-01T00:00:00.000Z",
      'dateTo' => "2024-01-31T23:59:59.009Z",
      'view' => "Detailed"
    );

    $endpoint = "/restapi/v1.0/account/~/extension/~/call-log";
    $resp = $platform->get($endpoint, $queryParams);
    foreach ($resp->json()->records as $record) {
      print_r (json_encode($record, JSON_PRETTY_PRINT));
    }
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to read user call log. " . $e->getMessage() . PHP_EOL);
  }
}
?>
