no_breadcrumb:true

# SMS Node.js Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings. 

In this Quick Start, we are going to help you send your first SMS on the platform in just a few minutes. Let's get started.C

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. If you do not yet have RingCentral account, please [create one](https://developer.ringcentral.com/login.html#/). Once you are logged in, follow these instructions:

1. Go to Console/Apps and click 'Create App' button.
2. Give your app a name and description, then click Next.
3. On the second page of the create app wizard enter the following:
    * Select 'Private' for Application Type.
    * Select 'Server-only (No UI)' for Platform Type.
4. On the third page of the create app wizard, select the following permissions:
    * SMS
    * Webhook Subscriptions
5. Leave "OAuth Redirect URI" blank for now. We will come back and edit that later. 

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Send an SMS

Select your preferred language below:

<h3>Create Project Directory</h3>

<p>Let's get started by created a directory to hold your project files.</p>

<pre><code class="bash">$ mkdir ringcentral-sms-project
$ cd ringcentral-sms-project
</code></pre>

<h3>Create .env</h3>

<p>Now, create a file called <tt>.env</tt> using the sample text below. Enter in your app's client ID and secret, and the other values called for.</p>

<pre><code class="bash">RINGCENTRAL_CLIENTID=
RINGCENTRAL_CLIENTSECRET=
RINGCENTRAL_SERVER=https://platform.devtest.ringcentral.com

RINGCENTRAL_USERNAME=&lt;YOUR ACCOUNT PHONE NUMBER>
RINGCENTRAL_PASSWORD=&lt;YOUR ACCOUNT PASSWORD>
RINGCENTRAL_EXTENSION=&lt;YOUR EXTENSION, PROBABLY "101">
</code></pre>

<h3>Create package.json</h3>

<p>Create another file called <tt>package.json</tt> using the text below.</p>

<pre><code class="json">{
   "name": "ringcentral-sms-project",
   "version": "0.1.0",
   "description": "A test project to evaluate using RingCentral.",
   "main": "index.js",
   "dependencies": {
      "dotenv": "^6.1.0",
      "express": "^4.16.4",
      "http": "0.0.0",
      "ringcentral-js-concise": "^0.7.1"
   },
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "engines": {
      "node": "*"
   }
}
</code></pre>

<h3>Create and Edit index.js</h3>

<p>Create a file called <tt>index.js</tt>. Be sure to edit the first line with the recipient's phone number.</p>

<pre><code class="javascript">var RECIPIENT_PHONE = '&lt;ENTER YOUR PHONE NUMBER HERE>'
var RingCentral = require('ringcentral-js-concise').default
var dotenv = require('dotenv')
dotenv.config();

const client = new RingCentral(process.env.RINGCENTRAL_CLIENTID,
                               process.env.RINGCENTRAL_CLIENTSECRET,
                               process.env.RINGCENTRAL_SERVER )
client.authorize({
    username:  process.env.RINGCENTRAL_USERNAME,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password:  process.env.RINGCENTRAL_PASSWORD
}).then( function() {
    const r = client.post('/restapi/v1.0/account/~/extension/~/sms', {
        from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
        to:  [{ phoneNumber: RECIPIENT_PHONE }],
        text: 'Hello World!'
    });
}).catch( function( error ) {
    console.log("ERROR: " + error)
});
</code></pre>

<h3>Run Your Code</h3>

<p>You are almost done. Now have <tt>npm</tt> install your dependencies, and then run your script.</p>

<pre><code class="bash">$ npm install
$ npm index.js
</code></pre>

## Publish Your App

Congradulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
