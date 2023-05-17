<?php
/* You get the environment parameters from your
application dashbord in your developer account
https://developers.ringcentral.com */

require('./../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'], $_ENV['RC_CLIENT_SECRET'], $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

create_compliance_export_task();

/*
* Create a task to export the Team Messaging store for a period of time.
*/
function create_compliance_export_task(){
  global $platform;
  echo ("Create export task.\n");
  try {
    $bodyParams = array(
      'timeFrom' => "2023-01-01T00:00:00.000Z",
      'timeTo' => "2023-01-31T23:59:59.999Z"
    );
    $endpoint = "/team-messaging/v1/data-export";
    $response = $platform->post($endpoint, $bodyParams);
    $jsonObj = $response->json();
    get_compliance_export_task($jsonObj->id);
  }catch(\RingCentral\SDK\Http\ApiException $e) {
    print_r ('Error: ' . $e->getMessage() . PHP_EOL);
  }
}

/*
* Check the status of the task using the taskId.
*/
function get_compliance_export_task($taskId){
  global $platform;
  echo ("Check export task status ...\n");
  $endpoint = "/team-messaging/v1/data-export/" . $taskId;
  try {
    $response = $platform->get($endpoint);
    $jsonObj = $response->json();
    if ($jsonObj->status == "Completed"){
      for ($i=0; $i<count($jsonObj->datasets); $i++){
        $fileName = "rc-export-reports_" . $jsonObj->creationTime . "_" . $i . ".zip";
        get_report_archived_content($jsonObj->datasets[$i]->uri, $fileName);
      }
    }else if ($jsonObj->status == "Accepted" || $jsonObj->status == "InProgress"){
      sleep(5);
      get_compliance_export_task($taskId);
    }else
      print_r ($jsonObj->status);
  }catch(\RingCentral\SDK\Http\ApiException $e) {
    print_r ('Error: ' . $e->getMessage() . PHP_EOL);
  }
}

/*
* Download the task compressed file and save to a local storage.
*/
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
