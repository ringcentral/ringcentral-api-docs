no_breadcrumb:true

# SMS API Explorer Quick Start

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

<p>The RingCentral API Explorer serves as a reference and test bench for all of RingCentral's API. This allows you to make calls with zero code. Let's get started.</p>

<h3>Access the RingCentral API Explorer</h3>

<p>Visit the [SMS section of the API Explorer](https://developer.ringcentral.com/api-reference#SMS-and-MMS-sendSMS). You should see this:</p>

<p><img src="../img/api-expl-sms.png" class="img-fluid"></p>

<h3>Sign-in and Select App</h3>

<p>Click the "Sign-in to try it out" button, and login to your developer account. When you are done, click the "Change App" button.</p>

<p><img src="../img/api-expl-change.png" class="img-fluid"></p>

<p>Then select the app your created in the first step.</p>

<h3>Set Call Parameters</h3>

<p>Now, set the API call parameters for the "from," "to" and "text" fields. For the "from" field use your account's phone number, and for the "to" field use your personal mobile phone number.</p>

<p><img src="../img/api-expl-params.png" class="img-fluid"></p>

<h3>Try it out</h3>

<p>Click the "Try it out" button to send yourself an SMS. If it works, try doing the same thing using one of our code samples.</p>

## Publish Your App

Congradulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
