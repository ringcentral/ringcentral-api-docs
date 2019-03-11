no_breadcrumb:true

# SMS Node.js Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you send your first SMS on the platform in just a few minutes. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create SMS App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=SMS+Quick+Start+App&desc=A+simple+app+to+demo+sending+an+SMS+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS,ReadMessages&redirectUri=" class="btn btn-primary">Create SMS App</a>
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
    <li>SMS</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Send an SMS

### Install RingCentral Node JS SDK

```bash
$ npm install ringcentral --save
```

### Create and Edit sms.js

Create a file called `sms.js`. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

```javascript
const RC = require('ringcentral')
var rcsdk = new RC({
    server: 'https://platform.devtest.ringcentral.com',
    appKey: '<ENTER CLIENT ID>',
    appSecret: '<ENTER CLIENT SECRET>'
});
var platform = rcsdk.platform();
platform.login({
    username: '<YOUR ACCOUNT PHONE NUMBER>',
    password: '<YOUR ACCOUNT PASSWORD>',
    extension: '<YOUR EXTENSION, PROBABLY "101">'
    })
    .then(function(resp) {
      platform.post('/account/~/extension/~/sms', {
        from: {'phoneNumber': '<YOUR ACCOUNT PHONE NUMBER>'},
        to: [{'phoneNumber': '<ENTER PHONE NUMBER>'}],
        text: 'Hello World from Node JS'
      })
      .then(function (resp) {
        console.log("SMS sent. Message status: " + resp.json().messageStatus)
       });
    });
```

### Run Your Code

You are almost done. Now run your script.

```bash
$ node sms.js
```

## Publish Your App

Congratulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
