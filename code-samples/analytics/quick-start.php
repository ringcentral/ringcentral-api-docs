<?php
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/');
$dotenv->load();

$FROM_DATE = '2022-04-12T07:00:00.000Z';
$TO_DATE   = '2022-05-11T07:00:00.000Z';

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

run_report( $FROM_DATE, $TO_DATE );

function run_report( $from_date, $to_date ){
  global $platform;
  $options = array(
    'grouping' => array(
      'groupBy' => "Users"
    ),
    'timeSettings' => array(
      'timeZone' => "US/Pacific",
      'timeRange' => array(
        'timeFrom' => $from_date,
        'timeTo' => $to_date
      )
    ),
    'responseOptions' => array(
      'counters' => array(
        'allCalls' => array(
          'aggregationType' => "Sum"
        )
      )
    )
  );
  #$options = {
  #    "grouping":{
  #      "groupBy":"Users"
  #    },
  #    "timeSettings":{
  #      "timeRange":{
  #        "timeFrom": $from_date,
  #        "timeTo": $to_date
  #      }
  #    },
  #    "responseOptions":{
  #      "counters":{
  #        "allCalls":{
  #          "aggregationType":"Sum"
  #        }
  #      }
  #   }
  #};
  $resp = $platform->post('/analytics/calls/v1/accounts/~/aggregation/fetch',
                          $options);
  $jsonObj = $resp->json();
  print_r( json_encode($jsonObj, JSON_PRETTY_PRINT) );
}
?>
