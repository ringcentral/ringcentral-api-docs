<?php
create_message_store_report();

/*
* Create a task to export the account messages within March 2023
*/
function create_message_store_report(){
  global $platform;
  try {
    $bodyParams = array(
        'dateFrom' => "2023-03-01T00:00:00.000Z",
        'dateTo' => "2023-03-31T23:59:59.999Z",
    );
    $endpoint = "/account/~/message-store-report";
    $response = $platform->post($endpoint, $bodyParams);
    $jsonObj = $response->json();
    get_message_store_report_task($jsonObj->id);
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'Expected HTTP Error: ' . $e;
    print ("Error message: " . $e->apiResponse->response()->error() . PHP_EOL);
  }
}

/*
* Check the task completion status
*/
function get_message_store_report_task($taskId){
  global $platform;
  try {
    $endpoint = "/account/~/message-store-report/" . $taskId;
    $response = $platform->get($endpoint);
    $jsonObj = $response->json();
    print ("Task creation status: " . $jsonObj->status . PHP_EOL);
    if ($jsonObj->status == "Completed"){
	    get_message_store_report_archive($jsonObj->id);
    } else if ( $jsonObj->status == "AttemptFailed" ||
                $jsonObj->status == "Failed" ||
                $jsonObj->status == "Cancelled" ) {
      print ("Export message store failed.");
    } else {
	    sleep(10);
	    get_message_store_report_task($taskId);
	  }
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'Expected HTTP Error: ' . $e;
    print ("Error message: " . $e->apiResponse->response()->error() . PHP_EOL);
  }
}

/*
* When the task is completed, use the task id to get the uri of the report file
*/
function get_message_store_report_archive($taskId){
  global $platform;
  print ("Getting report uri ...\n");
  try {
    $endpoint = "/account/~/message-store-report/" . $taskId . "/archive";
    $response = $platform->get($endpoint);
    $jsonObj = $response->json();
    for ($i=0; $i < count($jsonObj->records); $i++){
      $fileName = "message_store_content_" . date("Y_m_d_H_i", time()) . "_" . $i . ".zip";
      get_message_store_report_archive_content($jsonObj->records[$i]->uri, $fileName);
    }
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'Expected HTTP Error: ' . $e;
    print ("Error message: " . $e->apiResponse->response()->error() . PHP_EOL);
  }
}

function get_message_store_report_archive_content($contentUri, $fileName){
  global $platform;
  $uri = $platform->createUrl($contentUri, array(
    'addServer' => false,
    'addMethod' => 'GET',
    'addToken'  => true
  ));
  $dest = $fileName;
  file_put_contents($dest, fopen($uri, 'r'));
  print ($fileName . " file is saved to the local machine." . PHP_EOL);
}
