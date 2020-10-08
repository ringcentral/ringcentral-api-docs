<?php
require('vendor/autoload.php');

$rcsdk = new RingCentral\SDK\SDK( "client_id", "client_secret", "server_url" );

$platform = $rcsdk->platform();
$platform->login( "username", "extension_number", "password" );

create_compliance_export_task();

function create_compliance_export_task(){
    global $platform;
    echo ("Create export task.\n");
    $endpoint = "/restapi/v1.0/glip/data-export";
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
    $endpoint = "/restapi/v1.0/glip/data-export/" . $taskId;
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
