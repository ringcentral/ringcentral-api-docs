<?php
require_once(__DIR__ . '/vendor/autoload.php');
use RingCentral\SDK\Http\HttpException;
use RingCentral\SDK\Http\ApiResponse;
use RingCentral\SDK\SDK;
require_once('configs.php');

session_start();

$rcsdk = new SDK($RINGCENTRAL_CLIENT_ID, $RINGCENTRAL_CLIENT_SECRET, $RINGCENTRAL_SERVER_URL);
$platform = $rcsdk->platform();

if (isset($_REQUEST['oauth2callback'])){
  if (!isset($_GET['code'])) {
      return;
  }
  $qs = $platform->parseAuthRedirectUrl($_SERVER['QUERY_STRING']);
  $qs["redirectUri"] = $RINGCENTRAL_REDIRECT_URL;

  $platform->login($qs);
  $_SESSION['sessionAccessToken'] = $platform->auth()->data();
  header("Location: http://localhost:5000/test.html");
}

if (!isset($_SESSION['sessionAccessToken'])) {
    header("Location: http://localhost:5000");
    exit();
}else{
    $platform->auth()->setData((array)$_SESSION['sessionAccessToken']);
    if (!$platform->loggedIn()) {
        header("Location: http://localhost:5000");
        exit();
    }
    if (isset($_REQUEST['logout'])){
        unset($_SESSION['sessionAccessToken']);
        $platform->logout();
        header("Location: http://localhost:5000");
        exit();
    }elseif (isset($_REQUEST['api'])){
        if ($_REQUEST['api'] == "extension") {
            $endpoint = "/restapi/v1.0/account/~/extension";
            callGetRequest($endpoint, null);
        }elseif ($_REQUEST['api'] == "extension-call-log") {
            $endpoint = "/restapi/v1.0/account/~/extension/~/call-log";
            $params = array(
                'fromDate' => '2018-12-01T00:00:00.000Z',
              );
            callGetRequest($endpoint, $params);
        }elseif ($_REQUEST['api'] == "account-call-log") {
            $endpoint = "/restapi/v1.0/account/~/call-log";
            $params = array(
                'fromDate' => '2018-12-01T00:00:00.000Z',
              );
            callGetRequest($endpoint, $params);
        }
    }
}

function callGetRequest($endpoint, $params){
  global $platform;
  try {
    $resp = $platform->get($endpoint, $params);
    echo "<p>".$resp->text()."</p>";
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    print 'Expected HTTP Error: ' . $e->getMessage() . PHP_EOL;
  }
}
?>
