no_breadcrumb:true

# RingCentral Quick Start

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

<h3>Create Project Directory</h3>

<p>Let's get started by created a directory to hold your project files.</p>

<pre><code class="bash">$ mkdir ringcentral-sms-project
$ cd ringcentral-sms-project
</code></pre>

<h3>Install Composer</h3>

<pre><code class="bash">$ curl -sS https://getcomposer.org/installer | php</code></pre>

<h3>Create composer.json</h3>

<p>Create another file called <tt>composer.json</tt> using the text below.</p>

<pre><code class="json">{
    "minimum-stability": "dev"
}
</code></pre>

<h3>Install Prereqs</h3>

<pre><code>$ php composer.phar require ringcentral/ringcentral-php
$ php composer.phar require vlucas/phpdotenv
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

<h3>Create and Edit index.php</h3>

<p>Create a file called <tt>index.php</tt>. Be sure to edit the first line with the recipient's phone number.</p>

<pre><code class="php">&lt;?php
$RECIPIENT = "&lt;ENTER RECIPIENT PHONE NUMBER>";

require_once __DIR__ . '/vendor/autoload.php';
$dotenv = new Dotenv\Dotenv(__DIR__);
$dotenv->load();

use RingCentral\SDK\SDK;
$rcsdk = new SDK( getenv('RINGCENTRAL_CLIENTID'),
                  getenv('RINGCENTRAL_CLIENTSECRET'),
                  getenv('RINGCENTRAL_SERVER'),
                  'Demo', '1.0.0');
$platform = $rcsdk->platform();
// Authorize
$platform->login( getenv('RINGCENTRAL_USERNAME'),
                  getenv('RINGCENTRAL_EXTENSION'),
                  getenv('RINGCENTRAL_PASSWORD'),
                  true );
// Send SMS
$response = $platform
  ->post('/account/~/extension/~/sms', array(
            'from' => array('phoneNumber' => getenv('RINGCENTRAL_USERNAME')),
            'to'   => array(
                array('phoneNumber' => $RECIPIENT),
            ),
            'text' => 'Hello World!',
  ));
print 'Sent SMS ' . $response->json()->uri . PHP_EOL;
?>
</code></pre>

<h3>Run Your App</h3>

<p>You are almost done. Now, run your script.</p>

<pre><code class="bash">$ php index.php
</code></pre>

## Publish Your App

Congradulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
