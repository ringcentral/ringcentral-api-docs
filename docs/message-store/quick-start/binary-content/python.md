no_breadcrumb:true

# Message Store Python Quick Start

Welcome to the RingCentral Platform. RingCentral is the leading unified communications platform. From one system developers can integrate with, or build products around all the ways people communicate today: SMS, voice, fax, chat and meetings.

In this Quick Start, we are going to help you download message binary content from your RingCentral message store. Let's get started.

## Create an App

The first thing we need to do is create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Message Store App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Message+ Store+Quick+Start+App&desc=A+simple+app+to+demo+downloading+user+message+content&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=ReadMessages&redirectUri=" class="btn btn-primary">Create Message Store App</a>
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
    <li>ReadMessages</li>
  </ul>
  </li>
<li>We are using Password Flow authentication, so leave "OAuth Redirect URI" blank.</li>
</ol>
</div>

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Read user's messages' attachments

### Install RingCentral Python SDK

```bash
$ pip install ringcentral
```

### Create and Edit message_store.py

Create a file called `message_store.py`. Be sure to edit the variables in ALL CAPS with your app and user credentials.

``` python tab="SMS-MMS"
from ringcentral import SDK
from ringcentral.http.api_exception import ApiException
import json, os, time

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

def read_message_store_sms_mms():
    resp = platform.get('/restapi/v1.0/account/~/extension/~/message-store',
        {
            'dateFrom': '2018-01-01T00:00:00.000Z',
            'dateTo': '2018-12-31T23:59:59.999Z',
            'messageType': 'SMS'
        })
    # Limit API call to ~40 calls per minute to avoid exceeding API rate limit.
    timePerApiCall = 2100
    path = os.getcwd() + "/sms_mms_content/"
    try:
        os.mkdir(path)
    except OSError:
        print ("Creation of the directory %s failed" % path)
    for record in resp.json().records:
        if record.attachments != None:
            for attachment in record.attachments:
                fileName = str(record.attachments[0].id)
                if attachment.type == "MmsAttachment":
                    fileNameExt = attachment.contentType.split("/")
                    fileName = ("%s_mms_attachment.%s" % (fileName, fileNameExt[1]))
                else:
                    fileName += "_mms_text.txt"
                try:
                    res = platform.get(attachment.uri)
                    start = time.time()
                    file = open(("%s%s" % (path, fileName)),'w')
                    file.write(res.body())
                    file.close()
                    end = time.time()
                    delay = end - start
                    if delay < timePerApiCall:
                        time.sleep((timePerApiCall - delay)/1000)
                except ApiException as e:
                    print (e.getMessage())

read_message_store_sms_mms()
```

``` python tab="Fax"
from ringcentral import SDK
from ringcentral.http.api_exception import ApiException
import json, os, time

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

def read_message_store_fax():
    resp = platform.get('/restapi/v1.0/account/~/extension/~/message-store',
        {
            'dateFrom': '2018-01-01T00:00:00.000Z',
            'dateTo': '2018-12-31T23:59:59.999Z',
            'messageType': 'Fax'
        })
    # Limit API call to ~40 calls per minute to avoid exceeding API rate limit.
    timePerApiCall = 2100
    path = os.getcwd() + "/fax_content/"
    try:
        os.mkdir(path)
    except OSError:
        print ("Creation of the directory %s failed" % path)
    for record in resp.json().records:
        if record.attachments != None:
            for attachment in record.attachments:
                fileName = ("%s_fax_attachment" % str(attachment.id))
                fileNameExt = attachment.contentType.split("/")
                fileName = ("%s.%s" % (fileName, fileNameExt[1]))
                try:
                    res = platform.get(attachment.uri)
                    start = time.time()
                    file = open(("%s%s" % (path, fileName)),'w')
                    file.write(res.body())
                    file.close()
                    end = time.time()
                    delay = end - start
                    if delay < timePerApiCall:
                        time.sleep((timePerApiCall - delay)/1000)
                except ApiException as e:
                    print (e.getMessage())

read_message_store_fax()
```

``` python tab="Voicemail"
from ringcentral import SDK
from ringcentral.http.api_exception import ApiException
import json, os, time

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

def read_message_store_voicemail():
    resp = platform.get('/restapi/v1.0/account/~/extension/~/message-store',
        {
            'dateFrom': '2018-01-01T00:00:00.000Z',
            'dateTo': '2018-12-31T23:59:59.999Z',
            'messageType': 'VoiceMail'
        })
    # Limit API call to ~40 calls per minute to avoid exceeding API rate limit.
    timePerApiCall = 2100
    path = os.getcwd() + "/voicemail_content/"
    try:
        os.mkdir(path)
    except OSError:
        print ("Creation of the directory %s failed" % path)
    for record in resp.json().records:
        if record.attachments != None:
            for attachment in record.attachments:
                fileName = ("%s_voicemail" % str(record.attachments[0].id))
                if attachment.type == "AudioRecording":
                    if attachment.contentType == "audio/mpeg":
                        fileName = ("%s.mp3" % fileName)
                    else:
                        fileName = ("%s.wav" % fileName)
                elif attachment.type == "AudioTranscription" and record.vmTranscriptionStatus == "Completed":
                    fileName = ("%s.txt" % fileName)
                try:
                    res = platform.get(attachment.uri)
                    start = time.time()
                    file = open(("%s%s" % (path, fileName)),'w')
                    file.write(res.body())
                    file.close()
                    end = time.time()
                    delay = end - start
                    if delay < timePerApiCall:
                        time.sleep((timePerApiCall - delay)/1000)
                except ApiException as e:
                    print (e.getMessage())

read_message_store_voicemail()
```

### Run Your Code

You are almost done. Now run your script.

```bash
$ python message_store.py
```

## Graduate Your App

Congratulations on creating your first RingCentral application. The last step is to graduate your application. We recommend [going through this process](../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
