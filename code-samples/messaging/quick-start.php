<?php
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$RECIPIENT    = $_ENV['SMS_RECIPIENT'];

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

read_extension_phone_number();

function read_extension_phone_number(){
  global $platform;
  $resp = $platform->get("/restapi/v1.0/account/~/extension/~/phone-number");
  $jsonObj = $resp->json();
  foreach ($resp->json()->records as $record){
    foreach ($record->features as $feature){
      if ($feature == "SmsSender"){
        return send_sms($record->phoneNumber);
      }
    }
    exit("No phone number found with 'SmsSender' feature enabled.");
  }
}
function send_sms($fromNumber){
  global $platform,$RECIPIENT;
  try {
    $resp = $platform->post('/account/~/extension/~/sms',
        array(
           'from' => array ('phoneNumber' => $fromNumber),
           'to' => array(
                    array('phoneNumber' => $RECIPIENT)
                  ),
           'text' => 'Hello World from PHP'
         ));
    print("SMS sent. Message status: " . $resp->json()->messageStatus . PHP_EOL);
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("Message: " . $e->message . PHP_EOL);
  }
}
?>
