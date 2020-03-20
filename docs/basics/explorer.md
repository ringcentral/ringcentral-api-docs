# Exploring and Testing the API

The [RingCentral API Explorer](https://developers.ringcentral.com/api-reference) serves not only as a reference, but also as a test bench for all of RingCentral's APIs. The Explorer allows one to make calls with zero code. Let's use the API Explorer to send an SMS message without writing any code. 

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create RingCentral App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developers.ringcentral.com/new-app?name=API+Explorer+App&desc=A+generic+app+to+demo+API+calls+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=Contacts,EditExtensions,EditMessages,EditPresence,Faxes,Glip,InternalMessages,Meetings,ReadAccounts,ReadCallLog,ReadCallRecording,ReadContacts,ReadMessages,ReadPresence,RingOut,SMS,SubscriptionWebhook&redirectUri=" class="btn btn-primary">Create RingCentral App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developers.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "API App for RingCentral Office" under "What type of app are you creating?"</li>
<li>Select "Other Non-UI" under "Where will you be calling the API from?"
<li>Select "Only members of my organization/company" under "Who will be authorized to access your app?"
<li>On the third page of the create app wizard, select all permissions for your test.<br>
    <img src="../../../img/explorer_create_app.png" class="img-fluid">
</li>
<li>Leave "OAuth Redirect URI" blank for now. We will come back and edit that later.</li>
</ol>
</div>

### Access the RingCentral API Explorer

<a class="btn btn-secondary" target="_new" href="https://developers.ringcentral.com/api-reference#SMS-and-MMS-sendSMS">Open the API Explorer &raquo;</a>

Scroll to the "SMS section" of the API Explorer. You should see this:

<img src="../../../img/api-expl-sms.png" class="img-fluid">

### Sign-in and Select Your App

Click the "Sign-in to try it out" button, and login to your developer account. When you are done, click the "Change App" button.

<img src="../../../img/api-expl-change.png" class="img-fluid">

Then select the app your created in the first step.

### Set Call Parameters

Now, set the API call parameters for the "from," "to" and "text" fields. For the "from" field use your account's phone number, and for the "to" field use your personal mobile phone number.

!!! info "Live Sample Code"

    You should notice that the `curl` command displayed in the right-hand column changes as you enter in parameters. You should be able to copy and paste this command to your console and execute the API call that way as well. 

<img src="../../../img/api-expl-params.png" class="img-fluid">

### Try It Out

Click the "Try it out" button to send yourself an SMS. You can see the response on the right-hand side pane.

<img src="../../../img/api-expl-result.png" class="img-fluid">

<a class="btn btn-primary" href="https://developers.ringcentral.com/api-reference">Try the API Explorer Now</a>
