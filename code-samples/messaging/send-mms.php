<?php
	/*You get the environment parameters from your 
	application dashbord in your developer account 
	https://developers.ringcentral.com/ */
	
	require('vendor/autoload.php');
	$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
	$dotenv->load();


	const RECIPIENT = $_ENV['SMS_RECIPIENT'] 

	$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
	$_ENV['RC_CLIENT_SECRET'],
	$_ENV['RC_SERVER_URL'] );

	$platform = $rcsdk->platform();

	$platform->login( $_ENV['RC_USERNAME'],
	$_ENV['RC_EXTENSION'],
	$_ENV['RC_PASSWORD'] );
	
    $body = array(
	   'from' => array( 'phoneNumber' => "username" ),
	   'to'   => array( array('phoneNumber' => RECIPIENT ) ),
	   'text' => 'Hello world'
	);

	$request = $rcsdk->createMultipartBuilder()
	    ->setBody( $body )
	    ->add(fopen(__DIR__.'/TestImage.jpg', 'r'))
	    ->request('/account/~/extension/~/mms');
	$r = $platform->sendRequest($request);
?>