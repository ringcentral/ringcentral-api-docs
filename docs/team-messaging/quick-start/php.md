no_breadcrumb:true

# Create Glip Team PHP Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you create a new Glip team in just a few minutes. Let's get started.

## Create App and Get Credentials

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create SMS App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Glip+Team+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+Glip+team&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Glip&redirectUri=" class="btn btn-primary">Create Glip Team App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Give your app a name and description, then click Next.</li>
<li>On the second page of the create app wizard enter the following:
  <ul>
  <li>Select 'Private' for Application Type.</li>
  <li>Select 'Server-only (No UI)' for Platform Type.</li>
  </ul>
  </li>
<li>On the third page of the create app wizard, select the following permissions:
  <ul>
    <li>Glip</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Create a Glip team

### Install RingCentral PHP SDK

```php
$ curl -sS https://getcomposer.org/installer | php
$ php composer.phar require ringcentral/ringcentral-php
```

### Create and Edit create-glip-team.php

Create a file called `create-glip-team.php`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

```PHP
<?php
require(__DIR__ . 'vendor/autoload.php');

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>';
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>';
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com';

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>';
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>';
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">';

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

$endpoint = "/restapi/v1.0/glip/teams";
$params = array(
      "public" => true,
      "name" => "Fun team",
      "members" => array(array("email" => "member.1@gmail.com"),
                          array("email" => "member.2@gmail.com")),
      "description" => "Let chit chat here"
);

$resp = $platform->post($endpoint, $params);
print($resp->text());
?>
```

### Run Your Code

You are almost done. Now run your script. Then login to your account at https://glip-app.devtest.ringcentral.com/ to see the newly created team.

```bash
$ php create-glip-team.php
```

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
