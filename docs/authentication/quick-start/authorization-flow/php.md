no_breadcrumb:true

# Authorization Flow Authentication PHP Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you authorize a user to login with username and password to get an access token and a refresh token. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create User Login App" button below. Enter a name and description if you want to change them, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Authorization+Flow+Quick+Start+App&desc=A+simple+app+to+demo+authorizing+user+on+RingCentral&public=false&type=ServerWeb&carriers=7710,7310,3420&permissions=ReadAccounts,ReadCallLog&redirectUri=http://localhost:5000/oauth2callback" class="btn btn-primary">Create User Login App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Give your app a name and description, then click Next.</li>
<li>On the second page of the create app wizard enter the following:
  <ul>
  <li>Select 'Private' for Application Type.</li>
  <li>Select 'ServerWeb' for Platform Type.</li>
  </ul>
  </li>
<li>On the third page of the create app wizard, select the following permissions:
  <ul>
    <li>ReadAccounts,ReadCallLog</li>
  </ul>
  </li>
<li>Specify the redirect Uri as http://localhost:5000/engine.php?oauth2callback.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Authorization Flow

### Install RingCentral PHP SDK

```php
$ curl -sS https://getcomposer.org/installer | php
$ php composer.phar require ringcentral/ringcentral-php
```
### Create a configs.php file

Create a file called <tt>configs.php</tt>. Be sure to edit the variables value in ALL CAPS with your app credentials.

``` PHP
$RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
$RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";
$RINGCENTRAL_SERVER_URL = "https://platform.devtest.ringcentral.com";
$RINGCENTRAL_REDIRECT_URL = "http://localhost:5000/engine.php?oauth2callback";
```

### Create an index.php

Create a file called <tt>index.php</tt>. In this file we'll implement the login page.

``` php
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

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>RingCentral Authorization Code Flow Authentication</title>
    <script>
        var url = '<?php echo $url; ?>';
        var redirectUri = '<?php echo $RINGCENTRAL_REDIRECT_URL; ?>';
        var config = {
            authUri: url,
            redirectUri: redirectUri,
        }
        var OAuthCode = function (config) {
            this.config = config;
            this.loginPopup = function () {
                this.loginPopupUri(this.config['authUri'], this.config['redirectUri']);
            }
            this.loginPopupUri = function (authUri, redirectUri) {
                var win = window.open(authUri, 'windowname1', 'width=800, height=600');
                var pollOAuth = window.setInterval(function () {
                    try {
                        if (win.document.URL.indexOf(redirectUri) != -1) {
                            window.clearInterval(pollOAuth);
                            win.close();
                            window.location.href = "test.html"
                        }
                    }catch (e) {
                        console.log(e);
                    }
                }, 100);
            }
        }
        var oauth = new OAuthCode(config);
    </script>
</head>
<body>
  <div align="justify">
    <div style="width:500px">
      <p>
        <b>Important!</b> You need to enable pop-up for this web site in order to login your RingCentral via this Web app.
      </p>
    </div>
    <button onclick="oauth.loginPopup()">Login RingCentral Account</button>
  </div>
</body>
</html>
```

### Create a test.html file
Create a file called <tt>test.html</tt>. In this file we'll add a few API call test cases and a logout button.

``` html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
  <b><a href="http://localhost:5000/engine.php?logout">Logout</a></b>
  <h2>Call APIs</h2>
  <ul>
      <li><a href="http://localhost:5000/engine.php?api=extension">Read Extension Info</a></li>
      <li><a href="http://localhost:5000/engine.php?api=extension-call-log">Read Extension Call Log</a></li>
      <li><a href="http://localhost:5000/engine.php?api=account-call-log">Read Account Call Log</a></li>
  </ul>
</body>
</html>
```

### Create an __engine.php__ file

Create a file called <tt>engine.php</tt>. In this file we'll handle the **OAuth2 callback** and RingCentral API calls.

```php
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

  $apiResponse = $platform->login($qs);
  $_SESSION['sessionAccessToken'] = $apiResponse->json();
  exit();
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
```

### Run Your Code

You are almost done. Now run your script.

```bask
$ php -S localhost:5000
```

## Publish Your App

Congratulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
