<?php
// For code sample testing purpuse, we set the file name in the environment.
// Replace the $contentFile value with your valid audio file!
$contentFile = $_ENV['ENROLLMENT_CONTENT_3'];
create_speaker_enrollment($contentFile);

/*
* Enroll speaker identification
*/
function create_speaker_enrollment($contentFile)
{
  global $platform;
  try{
    // use own extension id as a unique enrollment id
    $tokens = $platform->auth()->data();
    $enrollmentId = $tokens['owner_id'];

    $content =  file_get_contents($contentFile);
    $base64data = base64_encode($content);

    $endpoint = "/ai/audio/v1/enrollments";

    // check if this speaker id exists
    $enrollmentObj = read_enrollment($enrollmentId);
    if ($enrollmentObj){
      // speaker id exists => update it
      print_r ("Existing enrollment");
      print_r (json_encode($enrollmentObj, JSON_PRETTY_PRINT));
      $bodyParams = array (
        'encoding' => "Mpeg",
        'languageCode' => "en-US",
        'content' => $base64data
      );
      $resp = $platform->patch($endpoint . "/" . $enrollmentId, $bodyParams);
    }else{
      // speaker id does not exist => enroll a new one
      $bodyParams = array (
        'encoding' => "Mpeg",
        'languageCode' => "en-US",
        'content' => $base64data,
        'enrollmentId' => $enrollmentId
      );
      $resp = $platform->post($endpoint, $bodyParams);
    }
    print_r ("New enrollment");
    print_r (json_encode($resp->json(), JSON_PRETTY_PRINT));
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ('Unable to enroll speaker identification. ' . $e->getMessage() . PHP_EOL);
  }
}

/*
* Read a speaker id
*/
function read_enrollment($enrollmentId) {
  global $platform;
  try{
    $endpoint = "/ai/audio/v1/enrollments/" .$enrollmentId;
    $resp = $platform->get($endpoint);
    $jsonObj = $resp->json();
    return $jsonObj;
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to find this speaker identification." . $e->getMessage() . PHP_EOL);
    return null;
  }
}
?>
