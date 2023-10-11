<?php
$NGROK = "YOUR-WEBHOOk-ADDRESS";
$WEBHOOK_URL = $NGROK . "/webhook";
$CONTENT_URI = 'https://rclabs-addin-resources.s3.us-east-1.amazonaws.com/media/Sample%20Call%20Tech%20Support.mp3';
analyze_interaction();

/*
* Transcribe a call recording and analyze interaction
*/
function analyze_interaction()
{
  global $platform, $WEBHOOK_URL, $CONTENT_URI;
  try {
    $bodyParams = array (
        'contentUri' =>  $CONTENT_URI,
        'encoding' => "Mpeg",
        'languageCode' =>  "en-US",
        'source' => "RingCentral",
        'audioType' =>  "CallCenter",
        'insights' => array ( "All" ),
        'enableVoiceActivityDetection' => True,
        'separateSpeakerPerChannel' =>  False
    );
    $endpoint = "/ai/insights/v1/async/analyze-interaction?webhook=" . urlencode($WEBHOOK_URL);
    $resp = $platform->post($endpoint, $bodyParams);
    $jsonObj = $resp->json();
    if ($resp->response()->getStatusCode() == 202) {
      print_r ("Job ID: " . $jsonObj->jobId . PHP_EOL);
      print_r("Ready to receive response at: " . $WEBHOOK_URL . PHP_EOL);
      $fileName = "transcript-db.json";
      $transcriptionObj = array();
      try {
        if (file_exists($fileName)) {
          $transcriptionObj = json_decode(file_get_contents($fileName));
        }
        $newTrascription = array (
          'jobId' => $jsonObj->jobId,
          'response' => array()
        );
        array_push($transcriptionObj, $newTrascription);
        file_put_contents($fileName, json_encode($transcriptionObj));
      } catch(Exception $err) {
        print_r ($err);
      }
    }else{

    }
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print_r ('HTTP Error: ' . $e->getMessage() . PHP_EOL);
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print_r ('Unable to analyze interaction. ' . $e->apiResponse->response()->error() . PHP_EOL);
  }
}
?>
