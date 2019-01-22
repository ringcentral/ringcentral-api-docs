no_breadcrumb:true

# SMS C# Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings. 

In this Quick Start, we are going to help you send your first SMS on the platform in just a few minutes. Let's get started.

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

<h3>Create and Edit index.vb</h3>

<h3>Run Your App</h3>

<p>You are almost done. Now, run your script.</p>

<pre><code class="bash">$ php index.php
</code></pre>

## Publish Your App

Congradulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
