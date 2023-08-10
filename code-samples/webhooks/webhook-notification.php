<?php
// Remember to modify the path to where you installed the RingCentral SDK and saved your .env file!
require('./../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . './../');
$dotenv->load();

// For the purpose of testing the code, we put the deliver address in the environment variable.
// Feel free to set the delivery address directly.
$DELIVERY_ADDRESS= $_ENV['WEBHOOK_DELIVERY_ADDRESS'] . "/webhook-server.php?webhook";

# Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();

// Authenticate a user using a personal JWT token
try {
  $platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );
  subscribe_for_notification();
  //read_subscriptions();
} catch (\RingCentral\SDK\Http\ApiException $e) {
  exit("Unable to authenticate to platform. Check credentials. " . $e->message . PHP_EOL);
}

/*
* Create a Webhok notification and subscribe for instant SMS message notification
*/
function subscribe_for_notification(){
  global $platform, $DELIVERY_ADDRESS;
  try {
      $bodyParams = array(
          'eventFilters' => array(
              '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'
          ),
          'deliveryMode' => array(
              'transportType' => "WebHook",
              'address' => $DELIVERY_ADDRESS
          ),
          'expiresIn' => 3600 );
      $endpoint = "/restapi/v1.0/subscription";
      $resp = $platform->post($endpoint, $bodyParams);
      print_r ("Subscription Id: " . $resp->json()->id . PHP_EOL);
      print_r ("Ready to receive incoming SMS via WebHook.");
  } catch (Exception $e) {
      print_r ("Exception: " . $e->getMessage());
  }
}

/*
* Read all created subscriptions
*/
function read_subscriptions(){
  global $platform;
  try {
      $endpoint = "/restapi/v1.0/subscription";
      $resp = $platform->get($endpoint);
      if (count($resp->json()->records) == 0)
        print_r ("No subscription");
      else {
        foreach ($resp->json()->records as $record) {
          print_r (json_encode($record, JSON_PRETTY_PRINT) . PHP_EOL);
          delete_subscription($record->id);
        }
      }
  } catch (Exception $e) {
      print_r ("Exception: " . $e->getMessage());
  }
}

/*
* Delete a subscription identified by the subscription id
*/
function delete_subscription($subscriptionId){
  global $platform;
  try {
      $endpoint = "/restapi/v1.0/subscription/" . $subscriptionId;
      $resp = $platform->delete($endpoint);
      print_r ("Subscription " . $subscriptionId . " deleted.");
  } catch (Exception $e) {
      print_r ("Exception: " . $e->getMessage());
  }
}
