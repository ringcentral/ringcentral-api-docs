<?php
/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */
   
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$RECIPIENT    = $_ENV['FAX_RECIPIENT'];

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

$request = $rcsdk->createMultipartBuilder()
    ->setBody(array(
      'to' => array(array('phoneNumber' => $RECIPIENT)),
      'faxResolution' => 'High',
    ))
    ->add(fopen('test.jpg', 'r'))
    ->request('/account/~/extension/~/fax');

$resp = $platform->sendRequest($request);
print_r ("FAX sent. Message status: " . $resp->json()->messageStatus);
