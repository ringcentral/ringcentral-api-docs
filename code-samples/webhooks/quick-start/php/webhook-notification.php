<?php
require('vendor/autoload.php');

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com';

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

$DELIVERY_ADDRESS='<https://xxxxxxxx.ngrok.io/webhook-notification.php?webhookcallback>';

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);
$platform = $rcsdk->platform();

if (isset($_REQUEST['webhookcallback'])){
    if (array_key_exists('HTTP_VALIDATION_TOKEN', $_SERVER)) {
        return header("Validation-Token: {$_SERVER['HTTP_VALIDATION_TOKEN']}");
    }else{
      $jsonStr = file_get_contents('php://input');
      $jsonObj = json_decode($jsonStr, TRUE);
      print_r($jsonObj['body']['subject']);
    }
}else{
    $platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);
    $params = array(
            'eventFilters' => array(
                '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'
                ),
            'deliveryMode' => array(
                'transportType' => "WebHook",
                'address' => $DELIVERY_ADDRESS
            ));
    try {
          $apiResponse = $platform->post('/subscription', $params);
          print_r ("Response: " . $apiResponse->text());
    }catch (Exception $e){
          print_r ("Exception: " . $e->getMessage());
    }
}
