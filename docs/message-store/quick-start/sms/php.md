no_breadcrumb:true

# Message Store PHP Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you read SMS messages from your RingCentral message store. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create SMS Messages App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=SMS+Messages+Quick+Start+App&desc=A+simple+app+to+demo+reading+user+SMS+messages&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadMessages&redirectUri=" class="btn btn-primary">Create Presence App</a>
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
    <li>ReadMessages</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Read user's SMS messages

### Install RingCentral PHP SDK

```php
$ curl -sS https://getcomposer.org/installer | php
$ php composer.phar require ringcentral/ringcentral-php
```

### Create and Edit presence.php

Create a file called `presence.php`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

```php
<?php
require('vendor/autoload.php');

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

$resp = $platform->get('/account/~/presence',
    array(
        'detailedTelephonyState' => true
    ));
foreach ($resp->json()->records as $record)
    print_r (json_encode($record, JSON_PRETTY_PRINT) . "\n");
```

### Run Your Code

You are almost done. Now run your script.

```bask
$ php presence.php
```

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
