<!DOCTYPE html>
<?php
require(__DIR__ . 'vendor/autoload.php');
use RingCentral\SDK\Http\HttpException;
use RingCentral\SDK\Http\ApiResponse;
use RingCentral\SDK\SDK;
require_once ('configs.php');

session_start();

$rcsdk = new SDK($RINGCENTRAL_CLIENT_ID, $RINGCENTRAL_CLIENT_SECRET, $RINGCENTRAL_SERVER_URL);
$platform = $rcsdk->platform();

// Using the authUrl to call the platform function
$url = $platform->authUrl(array(
          'redirectUri' => $RINGCENTRAL_REDIRECT_URL,
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
