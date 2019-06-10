no_breadcrumb:true

# Call Forwarding Node.js Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to define the forwarding rules for a RingCentral phone number, so that your personal mobile phone will also receive phone calls made to your RingCentral phone number. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Call Management App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Call+Management+Quick+Start+App&desc=A+simple+app+to+demo+call+forwarding+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadAccounts,EditExtensions&redirectUri=" class="btn btn-primary">Create Call Management App</a>
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
    <li>EditExtensions</li>
    <li>ReadAccounts</li>
  </ul>
</li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Setup Call Forwarding

### Install RingCentral Node JS SDK

```bash
$ npm install ringcentral --save
```

### Create and Edit forwarding.js

Create a file called <tt>forwarding.js</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set your personal phone number.

```javascript
const RC = require('ringcentral');

PERSONAL_CELL_PHONE = '<ENTER YOUR PHONE NUMBER>'

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
          call_forwarding()
	  show_extension()
      });

function call_forwarding() {
    platform.post('/restapi/v1.0/account/~/extension/~/forwarding-number', {
      'phoneNumber': PERSONAL_CELL_PHONE,
      'label'      : 'Personal Phone',
      'type'       : 'Mobile'
    })
    .then(function(resp){
        console.log("Call forwarding configured. Phone numbers: ")
    })
    .catch(function(resp){
        console.log("Something went wrong. Maybe you already configured \ncall forwarding for your mobile phone number? Let's see: ")
    })
}

function show_extension() {
    platform.get('/restapi/v1.0/account/~/extension/~/forwarding-number')
    .then(function(resp){
        resp.json().records.forEach( function(val) {
            console.log( val.label + ": " + val.phoneNumber )
        });
    })
}
```

### Run Your Code

You are almost done. Now run your script.

```bash
$ node forwarding.js
```

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
