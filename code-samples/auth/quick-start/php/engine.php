<?php
require_once(__DIR__ . '/vendor/autoload.php');
use RingCentral\SDK\Http\HttpException;
use RingCentral\SDK\Http\ApiResponse;
use RingCentral\SDK\SDK;
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();
session_start();

$REDIRECT_URL = $_ENV['RC_REDIRECT_URL'];
$LOCAL_SERVER = 'http://localhost:5000';


$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_APP_CLIENT_ID'],
                                  $_ENV['RC_APP_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();

if (isset($_REQUEST['oauth2callback'])){
  if (!isset($_GET['code'])) {
      return;
  }
  $qs = $platform->parseAuthRedirectUrl($_SERVER['QUERY_STRING']);
  $qs["redirectUri"] = $REDIRECT_URL;

  $platform->login($qs);
  $_SESSION['sessionAccessToken'] = $platform->auth()->data();
  header("Location: " + $LOCAL_SERVER + "/test.html");
}

if (!isset($_SESSION['sessionAccessToken'])) {
    header("Location: " + $LOCAL_SERVER);
    exit();
}else{
    $platform->auth()->setData((array)$_SESSION['sessionAccessToken']);
    if (!$platform->loggedIn()) {
        header("Location: " + $LOCAL_SERVER);
        exit();
    }
    if (isset($_REQUEST['logout'])){
        unset($_SESSION['sessionAccessToken']);
        $platform->logout();
        header("Location: " + $LOCAL_SERVER);
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
