<?php
require('vendor/autoload.php');
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$FROM_DATE = '2022-04-12T07:00:00.000Z';
$TO_DATE   = '2022-05-11T07:00:00.000Z';

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( $_ENV['RC_USERNAME'],
                  $_ENV['RC_EXTENSION'],
                  $_ENV['RC_PASSWORD'] );

run_report( $FROM_DATE, $TO_DATE );

function run_report( $from_date, $to_date ){
  global $platform;
  $options = {
      "grouping":{
        "groupBy":"Users"
      },
      "timeSettings":{
        "timeRange":{
          "timeFrom": $from_date,
          "timeTo": $to_date
        }
      },
      "responseOptions":{
        "counters":{
          "allCalls":{
            "aggregationType":"Sum"
          }
        }
      }
  };
  $resp = $platform->post('/analytics/phone/performance/v1/accounts/~/calls/aggregate',
                          $options);
  $jsonObj = $resp->json();
  print_r( $jsonObj );
}
?>
