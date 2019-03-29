no_breadcrumb:true

# SMS API Explorer Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Presence App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Presence+Quick+Start+App&desc=A+simple+app+to+demo+reading+account+users+presence+status&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadPresence&redirectUri=" class="btn btn-primary">Create Presence App</a>
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
    <li>ReadPresence</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Read Users Presence Status

The RingCentral API Explorer serves as a reference and test bench for all of RingCentral's API. This allows you to make calls with zero code. Let's get started.

### Access the RingCentral API Explorer

Visit the [Presence section of the API Explorer](https://developers.ringcentral.com/api-reference#Presence-accountPresence).

### Sign-in and Select App

Click the "Sign-in to try it out" button, and login to your developer account. When you are done, click the "Change App" button.

<img src="../../../img/api-expl-change.png" class="img-fluid">

Then select the app your created in the first step.

### Set API Parameters

Now, set the API query parameters for the "from", "to" and "text" fields. For the "from" field use your account's phone number, and for the "to" field use your personal mobile phone number.

<img src="../../../img/api-expl-params.png" class="img-fluid">

### Try it out

Click the "Try it out" button to read all users' presence status. If it works, try doing the same thing using one of our code samples.
