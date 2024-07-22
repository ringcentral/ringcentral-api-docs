<?php
// Remember to modify the path ./../ pointing to the location where the RingCentral SDK was installed and the .env file was saved!
require('./../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . './../');
$dotenv->load();

$CHAT_ID = '<GROUP ID>';

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_APP_CLIENT_ID'],
                                  $_ENV['RC_APP_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_USER_JWT'] ] );

$endpoint = "/team-messaging/v1/chats/"+CHAT_ID+"/notes";
$params = array(
    "title" => "This is a note",
    "body" => "<strong>heading</strong><br><br>Any HTML can be entered here."
);

$resp = $platform->post($endpoint, $params);
print($resp->text());
?>
