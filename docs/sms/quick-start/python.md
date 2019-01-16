no_breadcrumb:true

# SMS Python Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today:

* [SMS and MMS](../sms)
* [Voice](../voice)
* [Fax](../fax)
* [Chat/Text Messaging](../glip)
* Online Meetings

To introduce you to the platform we are going to walk you through building one of the most common use cases on our platform: sending an SMS or text message to phone. Let's get started.

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

<h3>Install Python Module</h3>

<pre><code>pip install ringcentral
</code></pre>

<h3>Create and Edit sms.py</h3>

<p>Create a file called <tt>sms.py</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.</p>

<pre><code>from ringcentral import SDK

RECIPIENT = '&lt;ENTER PHONE NUMBER>'

RINGCENTRAL_CLIENTID = '&lt;ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '&lt;ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '&lt;YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '&lt;YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '&lt;YOUR EXTENSION, PROBABLY "101">'

sdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = sdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

platform.post('/restapi/v1.0/account/~/extension/~/sms',
              {
                  'from' : { 'phoneNumber': RINGCENTRAL_USERNAME },
                  'to'   : [ {'phoneNumber': RECIPIENT} ],
                  'text' : 'Hello World from Python'
              },
              None,
              { 'Content-Type': 'application/json' } )
</code></pre>

<h3>Run Your Code</h3>

<p>You are almost done. Now run your script.</p>

<pre><code class="bash">$ python sms.py
</code></pre>

## Publish Your App

Congradulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
