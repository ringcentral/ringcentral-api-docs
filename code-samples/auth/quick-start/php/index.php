<!DOCTYPE html>
<?php
require(__DIR__ . 'vendor/autoload.php');
use RingCentral\SDK\SDK;
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

session_start();

$CLIENTID     = $_ENV['RC_CLIENT_ID'];
$CLIENTSECRET = $_ENV['RC_CLIENT_SECRET'];
$SERVER       = $_ENV['RC_SERVER_URL'];
$USERNAME     = $_ENV['RC_USERNAME'];
$PASSWORD     = $_ENV['RC_PASSWORD'];
$EXTENSION    = $_ENV['RC_EXTENSION'];
$REDIRECT_URL = $_ENV['RC_REDIRECT_URL'];

$rcsdk = new RingCentral\SDK\SDK($CLIENTID, $CLIENTSECRET, $SERVER);
$platform = $rcsdk->platform();
$platform->login($USERNAME, $EXTENSION, $PASSWORD);

// Using the authUrl to call the platform function
$url = $platform->authUrl(array(
          'redirectUri' => $REDIRECT_URL,
          'state' => 'initialState',
          'brandId' => '',
          'display' => '',
          'prompt' => ''
        ));
?>

<html>
  <head>
      <meta charset="UTF-8">
      <title>RingCentral Authorization Code Flow Authentication</title>
  </head>
  <body>
    <h2>
      RingCentral Authorization Code Flow Authentication
    </h2>
    <a href="<?php echo $url; ?>">Login RingCentral Account</a>
  </body>
</html>
