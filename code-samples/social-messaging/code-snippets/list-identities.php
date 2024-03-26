<?php
list_identities("");

/*
  List all identities
*/
function list_identities($pageToken){
  global $platform;
  try {
    $queryParams = array (
      'perPage' => 10
    );

    if ($pageToken != "")
      $queryParams['pageToken'] = $pageToken;

    $endpoint = "/cx/social-messaging/v1/identities";

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
      print ("Read identities from the next page ..." . PHP_EOL);
      list_identities($pageToken);
    }else{
      print ("Done reading all pages." . PHP_EOL);
    }
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to read identities. Error message:" . $e->getMessage() . PHP_EOL);
  }
}
?>
