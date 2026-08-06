<?php
require_once(__DIR__ . '/../vendor/autoload.php');

use Messente\Api\Api\OmnimessageApi;
use Messente\Api\Model\Omnimessage;
use Messente\Api\Model\SMS;
use Messente\Api\Configuration;


// Configure HTTP basic authorization: basicAuth
$config = Configuration::getDefaultConfiguration()
    ->setUsername('<MESSENTE_API_USERNAME>')
    ->setPassword('<MESSENTE_API_PASSWORD>');

$apiInstance = new OmnimessageApi(
    new GuzzleHttp\Client(),
    $config
);

$sms = new SMS(
    ["text" => "Hello SMS!", "sender" => "MySmsSender"]
);

$omnimessage = new Omnimessage([
    "to" => "<phone number in e.164 format>",
    "messages" => [$sms]
]);

try {
    $result = $apiInstance->sendOmnimessage($omnimessage);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling sendOmnimessage: ', $e->getMessage(), PHP_EOL;
}
?>
