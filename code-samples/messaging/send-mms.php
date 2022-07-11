	<?php

	require('vendor/autoload.php');
	$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
	$dotenv->load();

	//Make sure you provide RECIPIENT in the .env file.
	const RECIPIENT = $_ENV['SMS_RECIPIENT'] 

	/*Make sure you provide the RC_SERVER_URL, your RC_CLIENT_ID and RC_CLIENT_SECRET in the .env file.
	You get these parameters from your application dashbord in your developer account.
	*/
	$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
	$_ENV['RC_CLIENT_SECRET'],
	$_ENV['RC_SERVER_URL'] );

    //Create a platform instance to access the SMS APIs
	$platform = $rcsdk->platform();

    /*Provide the RingCentral RC_USERNAME(phone number/email id), RC_PASSWORD and RC_EXTENSION.
    You get these parameters from your sandbox account on the developer portal 
	https://developers.ringcentral.com/ */
	$platform->login( $_ENV['RC_USERNAME'],
	$_ENV['RC_EXTENSION'],
	$_ENV['RC_PASSWORD'] );
	
    /*Provide RECIPIENT. This RECIPIENT can be 
    any working phone number*/
    $body = array(
	   'from' => array( 'phoneNumber' => "username" ),
	   'to'   => array( array('phoneNumber' => RECIPIENT ) ),
	   'text' => 'Hello world'
	);

    //Choose an image to send within the message
	$request = $rcsdk->createMultipartBuilder()
	    ->setBody( $body )
	    ->add(fopen(__DIR__.'/TestImage.jpg', 'r'))
	    ->request('/account/~/extension/~/mms');
	$r = $platform->sendRequest($request);
	?>
	```