<?php
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_APP_CLIENT_ID'],
                                  $_ENV['RC_APP_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_USER_JWT'] ] );
print_r("Access key: " . $platform->auth()->data()['access_token']);
?>
