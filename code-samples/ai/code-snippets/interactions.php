<?php
$NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS";
$WEBHOOK_URL = $NGROK_ADDRESS . "/webhook";
$CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI";
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
    }
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print_r ('HTTP Error: ' . $e->getMessage() . PHP_EOL);
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print_r ('Unable to analyze interaction. ' . $e->apiResponse->response()->error() . PHP_EOL);
  }
}
?>
