<?php
/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */
   
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

create_webinar();

function create_webinar(){
  global $platform;
  try {
    $resp = $platform->post('/webinar/configuration/v1/webinars',
        array(
           'title' => "My first webinar",
	   'description' => "This webinar was created via the Webinar Quick Start guide for developers"
         ));
    print("Webinar created. Message status: " . $resp->json()->messageStatus . PHP_EOL);
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    exit("An error occurred: " . $e->message . PHP_EOL);
  }
}
?>
