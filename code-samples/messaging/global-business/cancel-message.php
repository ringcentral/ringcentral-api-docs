<?php
require_once(__DIR__ . '/../vendor/autoload.php');

use Messente\Api\Api\OmnimessageApi;
use Messente\Api\Configuration;

$config = Configuration::getDefaultConfiguration()
    ->setUsername('YOUR_MESSENTE_API_USERNAME')
    ->setPassword('YOUR_MESSENTE_API_PASSWORD');

$apiInstance = new OmnimessageApi(new GuzzleHttp\Client(), $config);

try {
    $apiInstance->cancelScheduledMessage('<omnimessage_id>');
    echo 'Scheduled omnimessage cancelled', PHP_EOL;
} catch (Exception $e) {
    echo 'Exception when cancelling an omnimessage: ', $e->getMessage(), PHP_EOL;
}
