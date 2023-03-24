<?php
/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */
   
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$CHAT_ID = '<GROUP ID>';

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

create_compliance_export_task();

function create_compliance_export_task(){
    global $platform;
    echo ("Create export task.\n");
    $endpoint = "/team-messaging/v1/data-export";
    try {
	$response = $platform->post($endpoint,
	    array(
		'timeFrom' => "2019-08-01T00:00:00.000Z",
		'timeTo' => "2019-08-26T23:59:59.999Z",
	    ));
	$json = $response->json();
	get_compliance_export_task($json->id);
    }catch(\RingCentral\SDK\Http\ApiException $e) {
	echo($e);
    }
}

function get_compliance_export_task($taskId){
    global $platform;
    echo ("Check export task status ...\n");
    $endpoint = "/team-messaging/v1/data-export/" . $taskId;
    try {
	$response = $platform->get($endpoint);
	$json = $response->json();
	if ($json->status == "Completed"){
	    for ($i=0; $i<count($json->datasets); $i++){
	      $fileName = "rc-export-reports_" . $json->creationTime . "_" . $i . ".zip";
	      get_report_archived_content($json->datasets[$i]->uri, $fileName);
	    }
	}else if ($json->status == "Accepted" || $json->status == "InProgress"){
	    sleep(5);
	    get_compliance_export_task($taskId);
	}else
	  echo ($json->status);
    }catch(\RingCentral\SDK\Http\ApiException $e) {
	echo($e);
    }
}

function get_report_archived_content($contentUri, $fileName){
    global $platform;
    echo ("Save export zip file to the local machine.\n");
    $uri = $platform->createUrl($contentUri, array(
	'addServer' => false,
	'addMethod' => 'GET',
	'addToken'  => true
    ));
    file_put_contents($fileName, fopen($uri, 'r'));
}
