no_breadcrumb:true

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you subscribe for PubNub push notifications using our Push Notifications API, which allows your application receiving notifications on a selected events. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Notifications App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Push+Notifications+Quick+Start+App&desc=A+simple+app+to+demo+creating+an+SMS+Notification+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS&redirectUri=" class="btn btn-primary">Create Notifications App</a>
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
    <li>SMS</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Subscribe for push notification

### Install RingCentral Python SDK

```bash
$ pip install ringcentral
```

### Create and Edit pubnub_notification.py

Create a file called <tt>pubnub_notification.py</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials. Be sure to also set the recipient's phone number.

```python
from multiprocessing import Process
from time import sleep
from ringcentral.subscription import Events
from ringcentral import SDK

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

def on_message(msg):
    print (msg)

def pubnub():
    try:
        s = rcsdk.create_subscription()
        s.add_events(['/account/~/extension/~/message-store/instant?type=SMS'])
        s.on(Events.notification, on_message)
        res = s.register()
        try:
            print("Wait for notification...")
        except Exception as e:
            print (e)
        while True:
            sleep(0.1)

    except KeyboardInterrupt:
        print("Pubnub listener stopped...")

p = Process(target=pubnub)
try:
    p.start()
except KeyboardInterrupt:
    p.terminate()
    print("Stopped by User")
```

### Run Your Code

You are almost done. Now run your script.

```bash
$ python pubnub_notification.py
```

## Publish Your App

Congratulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../basics/publish) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
