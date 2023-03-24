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

$endpoint = "/team-messaging/v1/teams";
$params = array(
      "public" => true,
      "name" => "Fun team",
      "members" => array(array("email" => "member.1@gmail.com"),
                          array("email" => "member.2@gmail.com")),
      "description" => "Let's chit chat here"
);

$resp = $platform->post($endpoint, $params);
print($resp->text());
?>
