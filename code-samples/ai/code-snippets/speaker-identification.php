<?php
$NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS";
$WEBHOOK_URL = $NGROK_ADDRESS . "/webhook";
$CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI";

speakers_identification();

/*
* Identify speakers from a conversation
*/
function speakers_identification()
{
  global $platform, $WEBHOOK_URL, $CONTENT_URI;
  $enrolledSpeakerIds = read_enrolled_speakers();
  if (count($enrolledSpeakerIds) > 0) {
    try {

      $bodyParams = array (
          'contentUri' =>  $CONTENT_URI,
          'encoding' => "Mpeg",
          'languageCode' =>  "en-US",
          'source' => "RingCentral",
          'audioType' =>  "CallCenter",
          'speakerIds' => $enrolledSpeakerIds
      );
      $endpoint = "/ai/audio/v1/async/speaker-identify?webhook=" . urlencode($WEBHOOK_URL);
      $resp = $platform->post($endpoint, $bodyParams);
      $jsonObj = $resp->json();
      if ($resp->response()->getStatusCode() == 202) {
        print_r ("Job ID: " . $jsonObj->jobId . PHP_EOL);
        print_r("Ready to receive response at: " . $WEBHOOK_URL . PHP_EOL);
      }
    }catch (\RingCentral\SDK\Http\ApiException $e) {
      print_r ('Unable to call speaker identify API. ' . $e->getMessage() . PHP_EOL);
    }
  }else{
    print_r ('No enrolled speakers. Please enroll a few speaker ids and try again.' . PHP_EOL);
  }
}

/*
* Read the account enrolled speakers
*/
function read_enrolled_speakers() {
  global $platform;
  $enrolledSpeakerIds = [];
  try{
    $queryParams = array (
        'partial' => false,
        'perPage' => 100,
        'page' => 1
    );
    $endpoint = "/ai/audio/v1/enrollments";
    $resp = $platform->get($endpoint, $queryParams);
    $jsonObj = $resp->json();
    foreach ($jsonObj->records as $enrollment) {
      array_push($enrolledSpeakerIds, $enrollment->speakerId);
    }
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ('Unable to find enrolled speakers. ' . $e->getMessage() . PHP_EOL);
  }
  return $enrolledSpeakerIds;
}
?>
