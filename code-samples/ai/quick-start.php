<?php
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/./');
$dotenv->load();

/* Read instructions on running code samples to include all required variables
   https://developers.ringcentral.com/guide/basics/code-samples */
$NGROK       = "<INSERT NGROK URL>";
$WEBHOOK_URL = $NGROK . "/webhook";
$CONTENT_URI = $_ENV['RC_MEDIA_URL'];

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );

$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

speech_to_text();

function speech_to_text(){
  global $platform, $WEBHOOK_URL, $CONTENT_URI;
  $resp = $platform->post("/ai/audio/v1/async/speech-to-text?webhook=" . urlencode($WEBHOOK_URL), array(
    "contentUri" =>               $CONTENT_URI,
    "encoding" =>                 "Wav",
    "languageCode" =>             "en-US",
    "source" =>                   "RingCentral",
    "audioType" =>                "Meeting",
    "enablePunctuation" =>        True,
    "enableSpeakerDiarization" => False
  ));
  print("Speech-to-text job " . $resp->response()->getReasonPhrase() . " with HTTP status code " . $resp->response()->getStatusCode() . PHP_EOL);

  if ($resp->response()->getStatusCode() == 202) {
    print("Ready to receive response at: ".$WEBHOOK_URL. PHP_EOL);
  } else {
    exit("An error occurred posting the request.");
  }
}
?>
