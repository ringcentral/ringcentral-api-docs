<?php
// Remember to modify the path ./../ pointing to the location where the RingCentral SDK was installed and the .env file was saved!
require('./../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . './../');
$dotenv->load();

# Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();

// Authenticate a user using a personal JWT token
try {
  $platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );
  speech_to_text();
} catch (\RingCentral\SDK\Http\ApiException $e) {
  exit("Unable to authenticate to platform. Check credentials. " . $e->getMessage() . PHP_EOL);
}

/*
* Convert speech to text
*/
function speech_to_text(){
  global $platform;
  try {
    $bodyParams = array (
      'contentUri' =>               $_ENV['CONTENT_URI'],
      'encoding' =>                 "Mpeg",
      'languageCode' =>             "en-US",
      'source' =>                   "RingCentral",
      'audioType' =>                "CallCenter",
      'enablePunctuation' =>        True,
      'enableSpeakerDiarization' => True
    );
    $callbackAddress = $_ENV['NGROK_URL'] . "/server.php?webhook";
    $endpoint = "/ai/audio/v1/async/speech-to-text?webhook=" . urlencode($callbackAddress);
    $resp = $platform->post($endpoint, $bodyParams);
    $jsonObj = $resp->json();
    if ($resp->response()->getStatusCode() == 202) {
      print_r("Job ID: " . $jsonObj->jobId . PHP_EOL);
      print_r("Ready to receive response at: " . $callbackAddress . PHP_EOL);
    }else{
      print_r("An error occurred posting the request.");
    }
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'HTTP Error: ' . $e->getMessage() . PHP_EOL;
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print 'Unable to call speech to text API. ' . $e->apiResponse->response()->error() . PHP_EOL;
  }
}
?>

<?php
/**********************************************************
 Code snippet section for boostrap testing purpose
**********************************************************/
$NGROK = $_ENV['NGROK_URL']; //"http://e255-45-62-187-76.ngrok-free.app";
$WEBHOOK_URL = $NGROK . "/webhook"; //"/server.php?webhook";
$CONTENT_URI = 'https://rclabs-addin-resources.s3.us-east-1.amazonaws.com/media/Phong-Swetha-01.mp3'; //'https://rclabs-addin-resources.s3.us-east-1.amazonaws.com/media/Sample%20Call%20Tech%20Support.mp3';
boostrap_test_function();
function boostrap_test_function(){
/*
  sleep(2);
  print_r ("Test analyze interactions". PHP_EOL);
  require_once (__DIR__ .'/code-snippets/interactions.php');
  sleep(2);
  print_r ("Test fetching stt task status". PHP_EOL);
  require_once (__DIR__ .'/code-snippets/check-task.php');
*/
  // sleep(2);
  // print_r ("Test enroll speaker identification". PHP_EOL);
  // require_once (__DIR__ .'/code-snippets/enrollment.php');

  // sleep(2);
  // print_r ("Test speaker identification". PHP_EOL);
  // require_once (__DIR__ .'/code-snippets/speaker-identification.php');

  // sleep(2);
  // print_r ("Test speaker identification". PHP_EOL);
  // require_once (__DIR__ .'/code-snippets/punctuation.php');

  // sleep(2);
  // print_r ("Test speaker identification". PHP_EOL);
  // require_once (__DIR__ .'/code-snippets/summarize.php');

  sleep(2);
  print_r ("Test speaker diarization". PHP_EOL);
  require_once (__DIR__ .'/code-snippets/speaker-diarization.php');
}
?>
