	<?php
    //Import RC SDK
    /*Provide the server_url, your client_id and client_secret.
    You get these parameters from your application dashbord in your developer account, for example
    server_url for production: https://platform.ringcentral.com
    server_url for sandbox: https://platform.devtest.ringcentral.com
    */
	$rcsdk = new RingCentral\SDK\SDK("client_id","client_secret","server_url");

    //Create a platform instance to access the SMS APIs
	$platform = $rcsdk->platform();

    /*Provide the RingCentral username(phone number/email id), account password and phone number extension.
    You get these parameters from your sandbox account on the developer portal https://developers.ringcentral.com/ */
	$platform->login( "username", "extension_number", "password" );
	
    /*Provide 'recipient_phone_number'. This 'recipient_phone_number' can be 
    any working phone number*/
    $body = array(
	   'from' => array( 'phoneNumber' => "username" ),
	   'to'   => array( array('phoneNumber' => "recipient_phone_number" ) ),
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