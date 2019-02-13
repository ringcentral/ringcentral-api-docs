no_breadcrumb:true

# Password Flow Authentication Node.js Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you authenticate a user with username and password to get an access token and a refresh token. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Basic App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Basic+Quick+Start+App&desc=A+simple+app+to+demo+Password+Flow+Authentication+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadAccounts&redirectUri=" class="btn btn-primary">Create a Basic App</a>
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
    <li>ReadAccounts</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Authenticate to get access token and refresh token

### Install RingCentral Node JS SDK

```bash
$ npm install ringcentral --save
```

### Create and Edit node.js

Create a file called <tt>node.js</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

```javascript
const RC = require('ringcentral');

RECIPIENT = '<ENTER PHONE NUMBER>'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new RC({
      server: RINGCENTRAL_SERVER,
      appKey: RINGCENTRAL_CLIENTID,
      appSecret: RINGCENTRAL_CLIENTSECRET
  });
var platform = rcsdk.platform();
platform.login({
      username: RINGCENTRAL_USERNAME,
      password: RINGCENTRAL_PASSWORD,
      extension: RINGCENTRAL_EXTENSION
      })
      .then(function(resp) {
          console.log(resp.json())
      });
```

### Run Your Code

You are almost done. Now run your script.

```bash
$ node node.js
```

## Call an API
