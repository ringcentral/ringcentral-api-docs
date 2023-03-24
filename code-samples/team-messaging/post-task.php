<?php
/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */
   
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$CHAT_ID = '<GROUP ID>';

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

$endpoint = "/team-messaging/v1/chats/"+CHAT_ID+"/notes";
$params = array(
    "subject" => "You need to do X",
    "assignees" => array( "id" => "<ID>" ),
    "description" => "In this task assignees will need to do x, y and z."
);

$resp = $platform->post($endpoint, $params);
print($resp->text());
?>
