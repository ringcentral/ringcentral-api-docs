<?php
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$CLIENTID     = $_ENV['RC_CLIENT_ID'];
$CLIENTSECRET = $_ENV['RC_CLIENT_SECRET'];
$SERVER       = $_ENV['RC_SERVER_URL'];
$USERNAME     = $_ENV['RC_USERNAME'];
$PASSWORD     = $_ENV['RC_PASSWORD'];
$EXTENSION    = $_ENV['RC_EXTENSION'];

$rcsdk = new RingCentral\SDK\SDK($CLIENTID, $CLIENTSECRET, $SERVER);
$platform = $rcsdk->platform();
$platform->login($USERNAME, $EXTENSION, $PASSWORD);

$endpoint = "/restapi/v1.0/glip/teams";
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
