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
  read_analytics_aggregate_data();
} catch (\RingCentral\SDK\Http\ApiException $e) {
  exit("Unable to authenticate to platform. Check credentials. " . $e->message . PHP_EOL);
}

/*
  Read aggregate analytics data for a period of time and grouped by users
*/
function read_analytics_aggregate_data() {
  global $platform;
  try{
    $bodyParams = array(
      'grouping' => array ('groupBy' => "Users"),
      'timeSettings' => array (
        'timeZone' => "America/Los_Angeles",
        'timeRange' => array (
          // Change the "timeFrom" value accordingly so that it does not exceed 184 days from the current date and time
          // The specified time is UTC time. If you want the timeFrom and timeTo your local time, you have to convert
          // your local time to UTC time!
          'timeFrom' => "2023-01-01T00:00:00.000Z",
          'timeTo' => "2023-02-15T23:59:59.999Z"
        )
      ),
      'responseOptions' => array (
        'counters' => array (
          'allCalls' => array (
            'aggregationType' => "Sum"
          )
        )
      )
    );

    $queryParams = array (
      'perPage' => 100
    );

    $endpoint = '/analytics/calls/v1/accounts/~/aggregation/fetch';
    $resp = $platform->post($endpoint, $bodyParams, $queryParams);
    print_r (json_encode($resp->json(), JSON_PRETTY_PRINT));
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ('Error: ' . $e->getMessage() . PHP_EOL);
  }
}
?>

<?php
/**********************************************************
 Code snippet section for boostrap testing purpose
**********************************************************/
boostrap_test_function();
function boostrap_test_function(){
  sleep(2);
  print_r ("Test reading timeline grouped by queues". PHP_EOL);
  require_once (__DIR__ .'/code-snippets/timeline-by-queues.php');

  sleep(2);
  print_r ("Test reading timeline grouped by users". PHP_EOL);
  require_once (__DIR__ .'/code-snippets/timeline-by-users.php');

}
?>
