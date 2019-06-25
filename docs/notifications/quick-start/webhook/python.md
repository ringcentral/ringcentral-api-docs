no_breadcrumb:true

# Webhook Notifications Python Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you create a Webhook push notifications app using our Push Notifications API, which allows your application receiving notifications on instant SMS message events. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Notifications App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Webhook+Notifications+Quick+Start+App&desc=A+simple+app+to+demo+creating+an+SMS+Notification+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SubscriptionWebhook,SMS&redirectUri=" class="btn btn-primary">Create Notifications App</a>
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
    <li>WebhookSubscriptions, SMS</li>
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

### Run ngrok to create a localhost tunnel

```bash
$ ngrok http 5000
```

Copy the forwarding address e.g. https://54a0541a.ngrok.io and append the path "/webhookcallback" to the address then paste it into the DELIVERY_ADDRESS variable in the code below.

Note: Running the demo code requires Python 3.x

### Create and Edit webhook-notification.py

Create a file called <tt>webhook-notification.py</tt>. Be sure to edit the variables in ALL CAPS with your app and user credentials.

```python
from ringcentral import SDK

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

DELIVERY_ADDRESS= '<https://XXXXXXXX.ngrok.io/webhookcallback>'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

try:
    eventFilters = ['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS']
    params = {
        "eventFilters" : eventFilters,
        "deliveryMode": {
            "transportType": 'WebHook',
            "address": DELIVERY_ADDRESS
        }
    }
    res = platform.post("/subscription", params)
    return res
except Exception as e:
    return e
```

### Create and Edit webhook-server.py

Create a file called <tt>webhook-server.py</tt>.

```python
from http.server import BaseHTTPRequestHandler, HTTPServer

class S(BaseHTTPRequestHandler):
    def do_POST(self):
        path = self.path
        if path == "/webhookcallback":
            validationToken = self.headers['Validation-Token']
            if validationToken is not None:
                self.send_response(200)
                self.send_header('Validation-Token', validationToken)
                return self.end_headers()
            else:
                content_len = int(self.headers.get('Content-Length'))
                payload = self.rfile.read(content_len)
                print (payload)
                return
        else:
            print ("Ignore this")


def run(server_class = HTTPServer, handler_class = S, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print ('Starting httpd...')
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

if len(argv) == 2:
    run(port=int(argv[1]))
else:
    run()
```

### Run Your Code

You are almost done. Now run your script.

Open a terminal window and run the server code.

```bask
$ python3 webhook-server.py
```

Open another terminal window and run the app

```bask
$ python3 webhook-notification.py
```
Now you can send an SMS message to the extension's phone number to see how you'll receive the notification.

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
