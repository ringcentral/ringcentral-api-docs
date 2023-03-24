<?php
/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */
   
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$DELIVERY_ADDRESS='<https://xxxxxxxx.ngrok.io/webhook-notification.php?webhookcallback>';

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();

if (isset($_REQUEST['webhookcallback'])){
    if (array_key_exists('HTTP_VALIDATION_TOKEN', $_SERVER)) {
       header("Content-type: application/json");
       return header("Validation-Token: {$_SERVER['HTTP_VALIDATION_TOKEN']}");
    }else{
      $jsonStr = file_get_contents('php://input');
      $jsonObj = json_decode($jsonStr, TRUE);
      print_r($jsonObj['body']['subject']);
    }
} else {
    $platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );
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
    } catch (Exception $e) {
        print_r ("Exception: " . $e->getMessage());
    }
}
