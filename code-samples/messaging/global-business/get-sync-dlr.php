<?php
require_once(__DIR__ . '/../vendor/autoload.php');

use Messente\Api\Api\DeliveryReportApi;
use Messente\Api\Configuration;

$config = Configuration::getDefaultConfiguration()
    ->setUsername('YOUR_MESSENTE_API_USERNAME')
    ->setPassword('YOUR_MESSENTE_API_PASSWORD');

$apiInstance = new DeliveryReportApi(new GuzzleHttp\Client(), $config);

try {
    $result = $apiInstance->retrieveDeliveryReport('<omnimessage_id>');
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when retrieving delivery report: ', $e->getMessage(), PHP_EOL;
}
