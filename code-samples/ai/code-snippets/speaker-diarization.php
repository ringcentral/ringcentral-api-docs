<?php
$NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS";
$WEBHOOK_URL = $NGROK_ADDRESS . "/webhook";
$CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI";

speakers_detection();

/*
* Detect speakers from a conversation
*/
function speakers_detection() {
  global $platform, $WEBHOOK_URL, $CONTENT_URI;
    try {

      $bodyParams = array (
          'contentUri' =>  $CONTENT_URI,
          'encoding' => "Mpeg",
          'languageCode' =>  "en-US",
          'source' => "RingCentral",
          'audioType' =>  "CallCenter"
      );
      $endpoint = "/ai/audio/v1/async/speaker-diarize?webhook=" . urlencode($WEBHOOK_URL);
      $resp = $platform->post($endpoint, $bodyParams);
      $jsonObj = $resp->json();
      if ($resp->response()->getStatusCode() == 202) {
        print_r ("Job ID: " . $jsonObj->jobId . PHP_EOL);
        print_r("Ready to receive response at: " . $WEBHOOK_URL . PHP_EOL);
      }
    }catch (\RingCentral\SDK\Http\ApiException $e) {
      print_r ('Unable to call speaker diarization API. ' . $e->getMessage() . PHP_EOL);
    }
}
?>
