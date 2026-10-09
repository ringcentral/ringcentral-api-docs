<?php
require_once(__DIR__ . '/../vendor/autoload.php');

use Messente\Api\Api\OmnimessageApi;
use Messente\Api\Configuration;
use Messente\Api\Model\Omnimessage;
use Messente\Api\Model\SMS;

$config = Configuration::getDefaultConfiguration()
    ->setUsername('YOUR_MESSENTE_API_USERNAME')
    ->setPassword('YOUR_MESSENTE_API_PASSWORD');

$apiInstance = new OmnimessageApi(new GuzzleHttp\Client(), $config);

$sms = new SMS([
    'text' => 'hello sms',
    'sender' => '<sender name (optional)>',
]);

$omnimessage = new Omnimessage([
    'to' => '<recipient_phone_number>',
    'time_to_send' => '2019-06-22T09:05:07+04:00',
    'messages' => [$sms],
]);

try {
    $result = $apiInstance->sendOmnimessage($omnimessage);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when scheduling an omnimessage: ', $e->getMessage(), PHP_EOL;
}
