<?php
/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */

require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

const SENDER    = $_ENV['SMS_SENDER'] 
const RECIPIENT = $_ENV['SMS_RECIPIENT'] 

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

$body = array(
	'from' => array( 'phoneNumber' => SENDER ),
	'to'   => array( array('phoneNumber' => RECIPIENT ) ),
	'text' => 'Hello World!'
);

$request = $rcsdk->createMultipartBuilder()
	->setBody( $body )
	->add(fopen(__DIR__.'/TestImage.jpg', 'r'))
	->request('/account/~/extension/~/mms');
$r = $platform->sendRequest($request);
?>