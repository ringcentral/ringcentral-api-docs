<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

create_message_store_report();

function create_message_store_report(){
    global $platform;
    echo ("create report ...\n");
    $endpoint = "/account/~/message-store-report";
    try {
	$response = $platform->post($endpoint,
	    array(
		'dateFrom' => "2019-03-01T00:00:00.000Z",
		'dateTo' => "2019-03-31T23:59:59.999Z",
	    ));
	$json = $response->json();
	get_message_store_report_task($json->id);
    }catch(\RingCentral\SDK\Http\ApiException $e) {
	echo($e);
    }
}

function get_message_store_report_task($taskId){
    global $platform;
    echo ("check task creation status ...\n");
    $endpoint = "/account/~/message-store-report/" . $taskId;
    try {
	$response = $platform->get($endpoint);
	$json = $response->json();
	if ($json->status == "Completed")
	    get_message_store_report_archive($json->id);
	else if ($json->status == "Accepted" || $json->status == "InProgress"){
	    sleep(2);
	    get_message_store_report_task($taskId);
	}else
	  echo ($json->status);
    }catch(\RingCentral\SDK\Http\ApiException $e) {
	echo($e);
    }
}

function get_message_store_report_archive($taskId){
    global $platform;
    echo ("getting report uri ...\n");
    $endpoint = "/account/~/message-store-report/" . $taskId . "/archive";
    try {
	$response = $platform->get($endpoint);
	$json = $response->json();
	for ($i=0; $i < count($json->records); $i++){
	    $fileName = "message_store_content_" . date("Y_m_d_H_i", time()) . "_" . $i . ".zip";
	    get_message_store_report_archive_content($json->records[$i]->uri, $fileName);
	}
	echo ("Done!\n");
    }catch(\RingCentral\SDK\Http\ApiException $e) {
	echo($e);
    }
}

function get_message_store_report_archive_content($contentUri, $fileName){
    global $platform;
    global $archiveFolder;
    echo ("Save report zip file to the local machine.\n");
    $uri = $platform->createUrl($contentUri, array(
	'addServer' => false,
	'addMethod' => 'GET',
	'addToken'  => true
    ));
    $dest = $archiveFolder.$fileName;
    file_put_contents($dest, fopen($uri, 'r'));
}
