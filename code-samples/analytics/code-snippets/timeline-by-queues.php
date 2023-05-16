<?php
read_analytics_timeline_grouped_by_queues();

/*
  Read timeline analytics data from a period of time, broken down by day time frames and grouped by call queues
*/
function read_analytics_timeline_grouped_by_queues() {
  global $platform;
  try{
    $bodyParams = array(
      'grouping' => array (
        'groupBy' => "Queues",
        'keys' => array ("62284876016") ),
      'timeSettings' => array (
        'timeZone' => "America/Los_Angeles",
        'timeRange' => array (
          // Change the "timeFrom" value accordingly so that it does not exceed 184 days from the current date and time
          // The specified time is UTC time. If you want the timeFrom and timeTo your local time, you have to convert
          // your local time to UTC time!
          'timeFrom' => "2023-01-01T00:00:00.000Z",
          'timeTo' => "2023-02-15T23:59:59.999Z"
        ),
        'advancedTimeSettings' => array (
          'includeDays' => array ("Sunday"),
          'includeHours' => array (
            array ('from' => "00:00", 'to' => "23:59")
          )
        )
      ),
      'responseOptions' => array (
        'counters' => array (
          'allCalls' => true
        )
      )
    );

    $queryParams = array (
      'interval' => "Day",
      'perPage' => 10
    );

    $endpoint = '/analytics/calls/v1/accounts/~/timeline/fetch';
    $resp = $platform->post($endpoint, $bodyParams, $queryParams);
    print_r (json_encode($resp->json(), JSON_PRETTY_PRINT));
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ('Error: ' . $e->getMessage() . PHP_EOL);
  }
}

/*
  Read call queues and create a list of call queue id
*/
function read_call_queues()
{
  global $platform;
  $callQueueIds = array();
  try{
    $queryParams = array (
          'type' => array ("Department")
        );
    $endpoint = "/restapi/v1.0/account/~/extension/";
    $resp = $platform->get($endpoint, $queryParams);
    $jsonObj = $resp->json();
    foreach ($jsonObj->records as $record) {
      // You can filter out any call queue you don't want to read analytics data!
      $callQueueIds->push($record->id);
    }
    return $callQueueIds;
  }catch (\RingCentral\SDK\Http\ApiException $e) {
    print_r ('Error: ' . $e->getMessage() . PHP_EOL);
  }
}
?>
