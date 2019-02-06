no_breadcrumb:true

# Fax .NET Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you send a fax message using our Fax API, which sends a cover page and a high resolution attachment to a recipient. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Fax App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Fax+Quick+Start+App&desc=A+simple+app+to+demo+sending+a+Fax+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Faxes&redirectUri=" class="btn btn-primary">Create SMS App</a>
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

## Send a Fax message

``` js fct_label="Node JS"

// Install RingCentral Node JS SDK

$ npm install ringcentral --save

// Create and Edit fax.js

/*
Create a file called <tt>fax.js</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.
*/

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
          send_fax()
      });

function send_fax() {
    var FormData = require('form-data');
    formData = new FormData();
    var body = {
      to: [{'phoneNumber': RECIPIENT}],
      faxResolution: 'High',
      coverPageText: "This is a demo Fax page from Node JS"
    }

    formData.append('json', new Buffer(JSON.stringify(body)), {
        filename: 'request.json',
        contentType: 'application/json'
        });

    formData.append('attachment', require('fs').createReadStream('test.jpg'));

    platform.post('/account/~/extension/~/fax', formData)
    .then(function (resp) {
        console.log("FAX sent. Message status: " + resp.json().messageStatus)
    })
}

/*** Run Your Code ***/
/*
You are almost done. Now run your script.
*/

$ node fax.js
```

``` python fct_label="Python"
<h3>Install RingCentral Python SDK</h3>

<pre><code>
$ pip install ringcentral
</code></pre>

<h3>Create and Edit fax.py</h3>

<p>Create a file called <tt>fax.py</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.</p>

from ringcentral import SDK

RECIPIENT = '<ENTER PHONE NUMBER>'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

builder = rcsdk.create_multipart_builder()
builder.set_body({
    'to': [{'phoneNumber': RECIPIENT}],
    'faxResolution': "High",
    'coverPageText': "This is a demo Fax page from Python"
})

attachment = ('test.jpg', open('test.jpg','r').read(), 'image/jpeg')
builder.add(attachment)

request = builder.request('/account/~/extension/~/fax')

resp = platform.send_request(request)
print 'Fax sent. Message status: ' + resp.json().messageStatus

<h3>Run Your Code</h3>

<p>You are almost done. Now run your script.</p>

$ python fax.py
```

``` php fct_label="PHP"
<h3>Install RingCentral PHP SDK</h3>

<pre><code>
$ curl -sS https://getcomposer.org/installer | php
$ php composer.phar require ringcentral/ringcentral-php
</code></pre>

<h3>Create and Edit fax.php</h3>

<p>Create a file called <tt>sms.php</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.</p>

<?php
require('vendor/autoload.php');

$RECIPIENT = '<ENTER PHONE NUMBER>'

$RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
$RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
$RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

$RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
$RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
$RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

$rcsdk = new RingCentral\SDK\SDK($RINGCENTRAL_CLIENTID, $RINGCENTRAL_CLIENTSECRET, $RINGCENTRAL_SERVER);

$platform = $rcsdk->platform();
$platform->login($RINGCENTRAL_USERNAME, $RINGCENTRAL_EXTENSION, $RINGCENTRAL_PASSWORD);

$request = $rcsdk->createMultipartBuilder()
                 ->setBody(array(
                     'to' => array(array('phoneNumber' => $RECIPIENT)),
                     'faxResolution' => 'High',
                 ))
                 ->add(fopen('test.jpg', 'r'))
                 ->request('/account/~/extension/~/fax');

$resp = $platform->sendRequest($request);
print_r ("FAX sent. Message status: " . $resp->json()->messageStatus);

<h3>Run Your Code</h3>

<p>You are almost done. Now run your script.</p>

$ php fax.php
```

``` c-sharp fct_label="C#"
<h3>Create a Visual Studio project</h3>
<ol>
<li>Choose Console Application .Net Core -> App</li>
<li>Select Target Framework .NET Core 2.1</li>
<li>Add NuGet package RingCentral.Client (3.0.0) SDK</li>
<li>Enter project name "Send_SMS"</li>
</ol>

<h3>Edit the file Program.cs</h3>

<p>Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.</p>

using System;
using System.Threading.Tasks;
using RingCentral;

namespace Send_Fax
{
    class Program
    {
        const string RECIPIENT = "<ENTER PHONE NUMBER>";
        const string RINGCENTRAL_CLIENTID = "<ENTER CLIENT ID>";
        const string RINGCENTRAL_CLIENTSECRET = "<ENTER CLIENT SECRET>";

        const string RINGCENTRAL_USERNAME = "<YOUR ACCOUNT PHONE NUMBER>";
        const string RINGCENTRAL_PASSWORD = "<YOUR ACCOUNT PASSWORD>";
        const string RINGCENTRAL_EXTENSION = "<YOUR EXTENSION, PROBABLY ";

        static void Main(string[] args)
        {
            send_fax().Wait();
        }
        static private async Task send_fax()
        {
            RestClient rc = new RestClient(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, false);
            await rc.Authorize(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD);
            if (rc.token.access_token.Length > 0)
            {
                var attachment = new Attachment { fileName = "test.jpg", contentType = "image/jpeg", bytes = System.IO.File.ReadAllBytes("test.jpg") };
                var attachments = new Attachment[] { attachment };

                var body = new {
                        to = new CallerInfo[] { new CallerInfo { phoneNumber = RECIPIENT } },
                        faxResolution = "High",
                        coverPageText = "This is a demo Fax page from C Sharp"
                    };
                var resp = await rc.Restapi().Account().Extension().Fax().Post(body, attachments);
                Console.WriteLine("Fax sent. Message status: " + resp.messageStatus);
            }
        }
    }
}

<h3>Run Your App</h3>
<p>You are almost done. Now run your app from Visual Studio.</p>
```
