no_breadcrumb:true

# RingOut Python Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you connect two people in a live phone call using our RingOut API, which dials two phone numbers, and then connects the two people when they answer. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create RingOut App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=RingOut+Quick+Start+App&desc=A+simple+app+to+demo+placing+a+call+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=RingOut&redirectUri=" class="btn btn-primary">Create RingOut App</a>

??? example "Show Detailed Instructions"
    1. [Login or create an account](https://developer.ringcentral.com/login.html#/) if you have not done so already.
    2. Go to Console/Apps and click 'Create App' button.
    3. Give your app a name and description, then click Next.
    4. On the second page of the create app wizard enter the following:
         * Select 'Private' for Application Type.
         * Select 'Server-only (No UI)' for Platform Type.
    5. On the third page of the create app wizard, select the following permissions:
         * RingOut
    6. We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Place a Call

### Install RingCentral Python SDK

```bash
$ pip install ringcentral
```

### Create and Edit ringout.py

Create a file called <tt>ringout.py</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

```python
from ringcentral import SDK

rcsdk = SDK( '<ENTER CLIENT ID>', '<ENTER CLIENT SECRET>',
             'https://platform.devtest.ringcentral.com')
platform = rcsdk.platform()
platform.login('<YOUR ACCOUNT PHONE NUMBER>',
               '<YOUR EXTENSION, PROBABLY "101">',
	       '<YOUR ACCOUNT PASSWORD>')
resp = platform.post('/restapi/v1.0/account/~/extension/~/ring-out',
              {
                  'from' : { 'phoneNumber': '<YOUR ACCOUNT PHONE NUMBER>' },
                  'to'   : {'phoneNumber': '<ENTER PHONE NUMBER TO CALL>' },
                  'playPrompt' : False
              })
print "Call placed. Call status: " + resp.json().status.callStatus              
```

### Run Your Code

You are almost done. Now run your script.

```bash
$ python ringout.py
```

## Publish Your App

Congratulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
