no_breadcrumb:true

# RingOut Node.js Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you connect two people in a live phone call using our RingOut API, which dials two phone numbers, and then connects the two people when they answer. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create RingOut App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=SMS+Quick+Start+App&desc=A+simple+app+to+demo+sending+an+SMS+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS,ReadMessages&redirectUri=" class="btn btn-primary">Create RingOut App</a>
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
    <li>RingOut</li>
  </ul>
</li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Place a Call

<h3>Install RingCentral PHP SDK</h3>

<pre><code>npm install ringcentral --save
</code></pre>

<h3>Create and Edit ringout.js</h3>

<p>Create a file called <tt>ringout.js</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.</p>

<pre><code>const RC = require('ringcentral');

RECIPIENT = '&lt;ENTER PHONE NUMBER>'

RINGCENTRAL_CLIENTID = '&lt;ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '&lt;ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '&lt;YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '&lt;YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '&lt;YOUR EXTENSION, PROBABLY "101">'

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
          call_ringout()
      });

function call_ringout(){
    platform.post('/restapi/v1.0/account/~/extension/~/ring-out',
                {
                    'from' : { 'phoneNumber': RINGCENTRAL_USERNAME },
                    'to'   : {'phoneNumber': RECIPIENT},
                    'playPrompt' : false
                })
}
</code></pre>

<h3>Run Your Code</h3>

<p>You are almost done. Now run your script.</p>

<pre><code class="bash">$ node ringout.js
</code></pre>

## Publish Your App

Congratulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
