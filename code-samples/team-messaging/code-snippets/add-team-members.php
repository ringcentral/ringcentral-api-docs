<?php
find_team("", "PHP Team");

/*
* Find the team id of the team to be added new members
*/
function find_team($pageToken, $teamName){
  global $platform;
  try{
    $queryParams = array(
      'recordCount' => 10,
      'pageToken' => $pageToken
    );

    $endpoint = "/team-messaging/v1/teams";
    $resp = $platform->get($endpoint, $queryParams);
    $jsonObj = $resp->json();
    // Search through the team list to find the team
    print_r ("Find the team id of the \"" . $teamName . PHP_EOL);
    foreach ($jsonObj->records as $record) {
      if ($record->name == $teamName){
        print_r ("Add new members to this team " . $teamName . PHP_EOL);
        add_new_members($record->id);
        return;
      }
    }
    // To read the next page, check and use the previous page token in the navigation object.
    if (property_exists($jsonObj->navigation, 'prevPageToken')){
        $pageToken = $jsonObj->navigation->prevPageToken;
        // Make sure not to exceed the API rate limit of 40 API calls per minute
        usleep(1200000);
        print_r ("Read newer teams ..." . PHP_EOL);
        find_team($pageToken, $teamName);
    }else{
      print_r("Cannot find team " . $teamName . PHP_EOL);
    }
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to read teams. " . $e->getMessage() . PHP_EOL);
  }
}

/*
* Add new members to a team identified by the team id
*/
function add_new_members($teamId) {
  global $platform;
  try {
    $bodyParams = array (
      'members' => array (
          // replace the email addresses below with valid internal or external new member email address
          array ('email' => "member.name@abc.com"),
          array ('email' => "guest.name@xyz.com")
      )
    );
    $endpoint = "/team-messaging/v1/teams/" . $teamId . "/add";
    $resp = $platform->post($endpoint, $bodyParams);
    print_r ("New member(s) added. Response status " . $resp->response()->getStatusCode() . PHP_EOL);
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ("Unable to add new members. " . $e->getMessage() . PHP_EOL);
  }
}
?>
