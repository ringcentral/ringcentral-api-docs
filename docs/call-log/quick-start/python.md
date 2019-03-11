no_breadcrumb:true

# Call Log Python Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you access your call history using our call-log API, which reads the voice and messaging transaction history and returns essential information about the transaction. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Call Log App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Read+Call+Log+Quick+Start+App&desc=A+simple+app+to+demo+reading+the+call+history+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadCallLog&redirectUri=" class="btn btn-primary">Create Call Log App</a>
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
    <li>ReadCallLog</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Read your call log

### Install RingCentral Python SDK

```bash
$ pip install ringcentral
```

### Create and Edit calllog.py

Create a file called <tt>calllog.py</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

```python
from ringcentral import SDK

rcsdk = SDK( '<ENTER CLIENT ID>', '<ENTER CLIENT SECRET>',
             'https://platform.devtest.ringcentral.com')
platform = rcsdk.platform()
platform.login('<YOUR ACCOUNT PHONE NUMBER>',
               '<YOUR EXTENSION, PROBABLY "101">',
	       '<YOUR ACCOUNT PASSWORD>')
params = {
    'view' : 'Simple'
}
resp = platform.get('/restapi/v1.0/account/~/extension/~/call-log', params)
for record in resp.json().records:
    print "Call type: " + record.type
```

### Run Your Code

You are almost done. Now run your script.

```bash
$ python calllog.py
```

## Publish Your App

Congratulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
