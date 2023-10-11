<?php
list_teams("");

/*
* List teams under an account. Read 10 teams at a time.
*/
function list_teams($pageToken){
  global $platform;
  try{
    $queryParams = array(
      'recordCount' => 10,
      'pageToken' => $pageToken
    );

    $endpoint = "/team-messaging/v1/teams";
    $resp = $platform->get($endpoint, $queryParams);
    $jsonObj = $resp->json();
    // List teams API returns a list of teams in the ascending order based on team creation date and time.
    // I.e. from older team to newer team
    foreach ($jsonObj->records as $record) {
      // You can filter out any call queue you don't want to read analytics data!
      print_r ("The team " . $record->name . " was created on " . $record->creationTime . PHP_EOL);
    }
    // To read the next page, check and use the previous page token in the navigation object.
    if (property_exists($jsonObj->navigation, 'prevPageToken')){
        $pageToken = $jsonObj->navigation->prevPageToken;
        // Make sure not to exceed the API rate limit of 40 API calls per minute
        usleep(1200000);
        print_r ("Read newer teams ..." . PHP_EOL);
        list_teams($pageToken);
    }
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to read teams. " . $e->getMessage() . PHP_EOL);
  }
}
?>
