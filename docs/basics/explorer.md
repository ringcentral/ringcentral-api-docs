no_breadcrumb:true

# API Explorer

The RingCentral API Explorer serves as a reference and test bench for all of RingCentral's API. This allows you to make calls with zero code. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create RingCentral App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Test+Application&desc=A+generic+app+to+demo+API+calls+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Contacts,EditExtensions,EditMessages,EditPresence,Faxes,Glip,InternalMessages,Meetings,ReadAccounts,ReadCallLog,ReadCallRecording,ReadContacts,ReadMessages,ReadPresence,RingOut,SMS,SubscriptionWebhook&redirectUri=" class="btn btn-primary">Create RingCentral App</a>
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
<li>On the third page of the create app wizard, select all permissions for your test.
  <img src="../../../img/explorer_create_app.png" class="img-fluid">
</li>
<li>Leave "OAuth Redirect URI" blank for now. We will come back and edit that later.</li>
</ol>
</div>

### Sign-in and Select App

Click the "Sign-in to try it out" button, and login to your developer account. When you are done, click the "Change App" button.

<img src="../../../img/explorer_select_app.png" class="img-fluid">

Then select the app your created in the first step.

### Try it out

Scroll to the API you want to try, specify query parameters then click the "Try it out" button. You can see the response on the right-hand side pane.

[Try now](https://developer.ringcentral.com/api-reference)
