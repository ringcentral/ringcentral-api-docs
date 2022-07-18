<?php
$USE_PKCE = True;

require_once(__DIR__ . '/vendor/autoload.php');
use RingCentral\SDK\Http\HttpException;
use RingCentral\SDK\Http\ApiResponse;
use RingCentral\SDK\SDK;
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();
session_start();

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();

// process an oauth redirect
if (isset($_GET['code'])) {
  $qs = $platform->parseAuthRedirectUrl( $_SERVER['QUERY_STRING'] );
  $qs["redirectUri"] = $_ENV['RC_REDIRECT_URL'];
  if ($USE_PKCE) {
    $qs["codeVerifier"] = $_SESSION['sessionCodeVerifier'];
  }
  $platform->login($qs);
  $_SESSION['sessionAccessToken'] = $platform->auth()->data();
}

// seed the SDK with auth context if present
if (isset($_SESSION['sessionAccessToken'])) {
  $platform->auth()->setData((array)$_SESSION['sessionAccessToken']);
}

// helper function for calling API and printing results
function callGetRequest($endpoint, $params){
  global $platform;
  try {
    $resp = $platform->get($endpoint, $params);
    header("Content-type: text/plain");
    echo $resp->text();
  } catch (\RingCentral\SDK\Http\ApiException $e) {
    print 'Expected HTTP Error: ' . $e->getMessage() . PHP_EOL;
  }
}

// process a logout request
if (isset( $_REQUEST['logout'] )){
  unset($_SESSION['sessionAccessToken']);
  $platform->logout();

// process a request to call the API as a demo
} elseif ( isset($_REQUEST['api'] )){
  switch ( $_REQUEST['api'] ) {
    case "extension":
      $endpoint = "/restapi/v1.0/account/~/extension";
      callGetRequest($endpoint, null);
      break;
    case "extension-call-log":
      $endpoint = "/restapi/v1.0/account/~/extension/~/call-log";
      $params = array( 'fromDate' => '2018-12-01T00:00:00.000Z' );
      callGetRequest($endpoint, $params);
      break;
    case "account-call-log":
      $endpoint = "/restapi/v1.0/account/~/call-log";
      $params = array( 'fromDate' => '2018-12-01T00:00:00.000Z' );
      callGetRequest($endpoint, $params);
      break;
  }
  // no more output
  exit();
}

if ( $platform->loggedIn() ) {
?>
<html>
<head>
    <meta charset="UTF-8">
      <title>RingCentral OAuth Example (logged in)</title>
</head>
<body>
  <h2>Test out these API functions:</h2>
  <ul>
      <li><a href="?api=extension">Read Extension Info</a></li>
      <li><a href="?api=extension-call-log">Read Extension Call Log</a></li>
      <li><a href="?api=account-call-log">Read Account Call Log</a></li>
      <li><a href="?logout">Logout</a></li>
  </ul>
</body>
</html>
<?php
} else {
  function base64url_encode($plainText) {          
    $base64 = base64_encode($plainText);
    $base64 = trim($base64, "=");
    $base64url = strtr($base64, '+/', '-_');
    return ($base64url);
  }
  $options = array(
               'redirectUri' => $_ENV['RC_REDIRECT_URL'],
               'state' => 'initialState'
             );
  if ($USE_PKCE) {
    $random = bin2hex(openssl_random_pseudo_bytes(32));
    $verifier = base64url_encode(pack('H*', $random));
    $options['code_challenge'] = base64url_encode( pack('H*', hash('sha256', $verifier)) );
    $options['code_challenge_method'] = 'S256';
    // store the verifier in the session, it will be used when processing the redirect
    $_SESSION['sessionCodeVerifier'] = $verifier;
  }  
  $url = $platform->authUrl( $options );
?>
<html>
  <head>
      <meta charset="UTF-8">
      <title>RingCentral OAuth Example (logged out)</title>
  </head>
  <body>
    <h2>RingCentral OAuth auth code flow demonstration</h2>
    <p><a href="<?php echo $url; ?>">Log into your RingCentral account</a></p>
  </body>
</html>
<?php
} 
?>