<?php
// Remember to modify the path ./../ pointing to the location where the RingCentral SDK was installed and the .env file was saved!
require('./../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . './../');
$dotenv->load();

# Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( "https://platform.ringcentral.com",
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();

// Authenticate a user using a personal JWT token
try {
  $platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );
  list_contents("");
} catch (\RingCentral\SDK\Http\ApiException $e) {
  exit("Unable to authenticate to platform. Check credentials. " . $e->getMessage() . PHP_EOL);
}

/*
* List contents from all connected channels
*/
function list_contents($pageToken){
  global $platform;
  try {
    $queryParams = array (
      'perPage' => 50
    );

    if ($pageToken != "")
      $queryParams['pageToken'] = $pageToken;

    $endpoint = "/cx/social-messaging/v1/contents";

    $resp = $platform->get($endpoint, $queryParams);
    $jsonObj = $resp->json();
    foreach ($jsonObj->records as $record){
        print_r (json_encode($record, JSON_PRETTY_PRINT) . PHP_EOL);
    }

    // To read the next page, check and use the nextPageToken in the paging object.
    if (property_exists($jsonObj->paging, 'nextPageToken') && $jsonObj->paging->nextPageToken != "") {
      $pageToken = $jsonObj->paging->nextPageToken;
      // Make sure not to exceed the API rate limit of 40 API calls per minute
      usleep(1200000);
      print ("Read content from the next page ..." . PHP_EOL);
      list_contents($pageToken);
    }else{
      print ("Done reading all pages." . PHP_EOL);
    }
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to call list content API. " . $e->getMessage() . PHP_EOL);
  }
}
?>

<?php
/**********************************************************
 Code snippet section for boostrap testing purpose
**********************************************************/
boostrap_test_function();
function boostrap_test_function(){

  // sleep(2);
  // print_r ("Test reply message". PHP_EOL);
  // require_once (__DIR__ .'/code-snippets/reply-message.php');

  sleep(2);
  print_r ("Test list identities". PHP_EOL);
  require_once (__DIR__ .'/code-snippets/list-identities.php');
}
?>
