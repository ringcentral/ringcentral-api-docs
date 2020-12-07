<?php
require('vendor/autoload.php');

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com';

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

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
  }
}
function send_sms($fromNumber){
  global $platform;
  $RECIPIENT = '<ENTER PHONE NUMBER>';
  try {
    $resp = $platform->post('/account/~/extension/~/sms',
        array(
           'from' => array ('phoneNumber' => $fromNumber),
           'to' => array(
                    array('phoneNumber' => $RECIPIENT)
                  ),
           'text' => 'Hello World from PHP'
         ));
    print_r ("SMS sent. Message status: " . $resp->json()->messageStatus . PHP_EOL);
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print '  Message: ' . $e->apiResponse->response()->error() . PHP_EOL;
  }
}
?>
