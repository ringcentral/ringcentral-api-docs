<?php
/*
* Read speakers identification
*/
function read_enrollments()
{
  global $platform;
  try{
    $queryParams = array (
      'partial' => true,
      'perPage' => 100,
      'page' => 1
    );
    $endpoint = "/ai/audio/v1/enrollments";
    $resp = $platform->read($endpoint, $queryParams);
    print_r (json_encode($resp->json(), JSON_PRETTY_PRINT));
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ('Unable to enroll speaker identification. ' . $e->getMessage() . PHP_EOL);
  }
}

/*
* Delete a speaker identification
*/
function delete_enrollment($speakerId)
{
  global $platform;
  try{
    $endpoint = "/ai/audio/v1/enrollments/" . $speakerId;
    $resp = $platform->delete($endpoint);
    print_r ("Deleted");
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ('Unable to enroll speaker identification. ' . $e->getMessage() . PHP_EOL);
  }
}
?>
