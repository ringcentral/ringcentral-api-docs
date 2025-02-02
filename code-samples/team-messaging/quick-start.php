<?php
// Remember to modify the path ./../ pointing to the location where the RingCentral SDK was installed and the .env file was saved!
require('./../vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . './../');
$dotenv->load();

# Instantiate the SDK and get the platform instance
$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_APP_CLIENT_ID'],
                                  $_ENV['RC_APP_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();

// Authenticate a user using a personal JWT token
try {
  $platform->login( [ "jwt" => $_ENV['RC_USER_JWT'] ] );
  create_team();
} catch (\RingCentral\SDK\Http\ApiException $e) {
  exit("Unable to authenticate to platform. Check credentials. " . $e->message . PHP_EOL);
}

/*
* Create a new public team in Team Messaging with 3 internal members including the team owner
*/
function create_team(){
  global $platform;
  try {
    $bodyParams = array(
          'public' => true,
          'name' => "PHP Team",
          // Add internal members using their extension ids
          // Get your user extension id by calling the /restapi/v1.0/account/~/extension endpoint!
          'members' => array ( array ( 'id' => "590490017"), array ( 'id' => "595861017" )),
          // You can also add members using their email address, especially for guest members who are not under your account company.
          // 'members' => array(array('email => "member.1@gmail.com"), array('email' => "member.2@gmail.com"), array('id' => "extensionId")),
          'description' => "Let's talk about PHP"
    );
    $endpoint = "/team-messaging/v1/teams";
    $resp = $platform->post($endpoint, $bodyParams);
    print($resp->text());
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    // Getting error messages using PHP native interface
    print 'HTTP Error: ' . $e->getMessage() . PHP_EOL;
    // Another way to get message, but keep in mind, that there could be no response if request has failed completely
    print 'Unable to create a new team. ' . $e->apiResponse->response()->error() . PHP_EOL;
  }
}
?>


<?php
/**********************************************************
 Code snippet section for boostrap testing purpose
**********************************************************/
boostrap_test_function();
function boostrap_test_function(){
/*
  sleep(2);
  print_r ("Test creating compliance export task". PHP_EOL);
  require_once (__DIR__ .'/code-snippets/compliance-export.php');

  sleep(2);
  print_r ("Test reading teams". PHP_EOL);
  require_once (__DIR__ .'/code-snippets/list-teams.php');
*/
  sleep(2);
  print_r ("Test adding team members". PHP_EOL);
  require_once (__DIR__ .'/code-snippets/add-team-members.php');
}
?>
