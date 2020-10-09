<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

$resp = $platform->get('/account/~/call-queues');
foreach ($resp->json()->records as $group){
    if ($group->name == "Support Department"){
	$params = array(
	  'addedExtensionIds' => array("888888888", "999999999")
	  );
	$resp = $platform->post('/account/~/call-queues/'.$group->id.'/bulk-assign', $params);
	print_r($resp->response());
	break;
    }
}
?>