# SMS Application Walk-through

This walk-through of an SMS application will show you how to go about building a fully functional SMS application. In this walk-through you will learn:

* How to setup your repository to work with multiple environments.
* How to send a simple SMS.
* How to send a image in an SMS message, a.k.a. "MMS."
* How to track the delivery state of a message.
* How to modify the message history.
* How to reply to an SMS message. 

Let's begin!

## Create a Project

Let's begin where every new software project begins: setting up your local development environment and preparing your workspace to code. In node, we do this by creating a directory to hold our project files. The first file we create is our `package.json` file which defines our project name, and our dependencies. Create this file using the contents below:

```json
{
  "name": "sms-api-demo",
  "version": "0.1.0",
  "license": "MIT",
  "description": "A demo to teach users to use RingCentral SMS API.",
  "scripts": {
    "upgrade": "yarn-upgrade-all"
  },
  "dependencies": {
    "dotenv": "^5.0.1",
    "form-data": "^2.3.2",
    "ringcentral": "^3.2.0"
  },
  "devDependencies": {
    "standard": "^11.0.1",
    "yarn-upgrade-all": "^0.3.0"
  }
}
```

Then, go to the command line, and install your prerequisites.

```
$ yarn install
```

## Creating an Application

Now, let's setup RingCentral and your environment. 

The first step is to login to the RingCentral Developer Portal, and create an app. You can do this easily by clicking the button/link below, and then clicking the "Create" button.

*You can safely ignore the Redirect URI field.*

<a href="https://developer.ringcentral.com/new-app?name=Sample+SMS+App&desc=A+sample+app+created+by+the+SMS+App+Walk-through&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SMS,ReadMessages,EditMessages,SubscriptionWebhook&redirectUri=" class="btn btn-primary">Create SMS Application</a>
    
After creating the app, you will be taken to the app's dashboard. Make note of the following, as we will be using this in setting up your environment:

* Client ID
* Client Secret
* Account Phone Number

## Create Your .env File

The ability to create a single software package that can be easily deployed to any environment is a modern-day essential. Therefore, we will begin with this fundamental setup, by placing all of our environment specific variables in a config file (of sorts). 

Create a copy of the provided `.env.sample` file and name it `.env`. Edit this new file and enter in the various variables accordingly.

| Name | Help/Description |
|------|------------------|
| `RINGCENTRAL_CLIENT_ID` | Enter in the Client ID provided to you after creating your application. |
| `RINGCENTRAL_CLIENT_SECRET` | Enter in the Client Secret provided to you after creating your application. |
| `RINGCENTRAL_USERNAME` | Enter the **phone number** provisioned to you when you setup your RingCentral account. If you choose to use your company's phone number, rather than your direct line, then you will also need to specify an extension below. |
| `RINGCENTRAL_EXTENSION` | Enter the extension corresponding to the user who will authenticate into the app. This is not necessary if you used your direct line number above. |
| `RINGCENTRAL_PASSWORD` | Enter in the password you specified when you created your RingCentral account. |
| `RINGCENTRAL_RECEIVER` | Enter in any phone number you would like to receive an SMS. Obviously you may want to move this variable outside of the environment and bind it to a customer phone number or something else. |

Here is a sample `.env` file to use as a template:

```
RINGCENTRAL_CLIENT_ID=
RINGCENTRAL_CLIENT_SECRET=
RINGCENTRAL_USERNAME=
RINGCENTRAL_EXTENSION=
RINGCENTRAL_PASSWORD=
RINGCENTRAL_RECEIVER=
# Sandbox
RINGCENTRAL_SERVER_URL=https://platform.devtest.ringcentral.com
# Production
#RINGCENTRAL_SERVER_URL=https://platform.ringcentral.com
```

!!! note "Multiple .env Files"
    Placing the variables in a `.env` file will make it much easier down the road when you need to deploy the same code base to production. In fact, you might have a different configuration for your QA and/or staging environments. Create as many `.env` files as you need. 

## Sending an SMS

First, let's create a file called `send-sms.js` using the code below:

```javascript tab="Javascript"
const SDK = require('ringcentral')
const dotenv = require('dotenv')

dotenv.config()

const rcsdk = new SDK({
  server: process.env.RINGCENTRAL_SERVER_URL,
  appKey: process.env.RINGCENTRAL_CLIENT_ID,
  appSecret: process.env.RINGCENTRAL_CLIENT_SECRET
})

const platform = rcsdk.platform()

platform.login({
  username: process.env.RINGCENTRAL_USERNAME,
  extension: process.env.RINGCENTRAL_EXTENSION,
  password: process.env.RINGCENTRAL_PASSWORD
}).then(response => {
  platform.post('/account/~/extension/~/sms', {
    from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
    to: [
      { phoneNumber: process.env.RINGCENTRAL_RECEIVER }
    ],
    text: 'Message content'
  }).then(response => {
    console.log('SMS sent: ' + response.json().id)
  }).catch(e => {
    console.error(e)
  })
}).catch(e => {
  console.error(e)
})
```

```php tab="PHP"
<?php

use Symfony\Component\Dotenv\Dotenv;

require('vendor/autoload.php');

$dotenv = new Dotenv();
$dotenv->load(__DIR__.'/.env');

$rcsdk = new RingCentral\SDK\SDK(getenv('RINGCENTRAL_CLIENT_ID'),
                                 getenv('RINGCENTRAL_CLIENT_SECRET'),
      	                         getenv('RINGCENTRAL_SERVER_URL'));

$platform = $rcsdk->platform();
$platform->login( getenv('RINGCENTRAL_USERNAME'),
                  getenv('RINGCENTRAL_EXTENSION'),
                  getenv('RINGCENTRAL_PASSWORD'));

$r = $platform->post('/account/~/extension/~/sms', array(
    'from' => array('phoneNumber' => getenv('RINGCENTRAL_USERNAME')),
    'to' => array(
        array('phoneNumber' => getenv('RINGCENTRAL_RECEIVER')),
    ),
    'text' => 'Message content',
));

print("Message ID: " . $r->json()->id . "\n");
?>
```

```python tab="Python"
from ringcentral import SDK
import os
from dotenv import load_dotenv

load_dotenv(".env")

sdk = SDK( os.getenv("RINGCENTRAL_CLIENT_ID"),
           os.getenv("RINGCENTRAL_CLIENT_SECRET"),
           os.getenv("RINGCENTRAL_SERVER_URL") )

platform = sdk.platform()
platform.login( os.getenv("RINGCENTRAL_USERNAME"),
                os.getenv("RINGCENTRAL_EXTENSION"),
                os.getenv("RINGCENTRAL_PASSWORD") )

def send_sms_message( toNumber, message ):
    try:
        response = platform.post('/restapi/v1.0/account/~/extension/~/sms', {
            'from': {'phoneNumber': os.getenv("RINGCENTRAL_USERNAME")},
            'to': [{'phoneNumber': toNumber}],
            'text': message
        })
        print("Message ID: " + str(response.json().id))
    except Exception as e:
        print(e)

if __name__ == '__main__':
    toNumber = os.getenv("RINGCENTRAL_RECEIVER")
    message = 'This is a test message from Python'
    send_sms_message(toNumber, message)
```

This script will work right out of the box. So let's try it out. Go to the console and run this command:

```
$ node send-sms.js
```

You should see the message Id output to the screen, and shortly an SMS will arrive on the recipient's phone. 

Now, let's walk-through the code to see what just happened. 

## Initializing the Client

The first thing we do is load the environment variables within the `.env` file you created in the previous step. Then using those variables, we instantiate a new javascript client.

```javascript tab="Javascript"
const dotenv = require('dotenv')

dotenv.config()

const rcsdk = new SDK({
  server: process.env.RINGCENTRAL_SERVER_URL,
  appKey: process.env.RINGCENTRAL_CLIENT_ID,
  appSecret: process.env.RINGCENTRAL_CLIENT_SECRET
})

const platform = rcsdk.platform()
```

```php tab="PHP"
<?php
use Symfony\Component\Dotenv\Dotenv;

require('vendor/autoload.php');

$dotenv = new Dotenv();
$dotenv->load(__DIR__.'/.env');

$rcsdk = new RingCentral\SDK\SDK(getenv('RINGCENTRAL_CLIENT_ID'),
                                 getenv('RINGCENTRAL_CLIENT_SECRET'),
      	                         getenv('RINGCENTRAL_SERVER_URL'));
?>
```

```python tab="Python"
load_dotenv(".env")

sdk = SDK( os.getenv("RINGCENTRAL_CLIENT_ID"),
           os.getenv("RINGCENTRAL_CLIENT_SECRET"),
           os.getenv("RINGCENTRAL_SERVER_URL") )

platform = sdk.platform()
```

## Authentication

Before making any call to the RingCentral API, one must authenticate their client. In this sample application we are authenticating using our own username and password. That means the SMS we send, will appear to the recipient to be sent from us - or the phone number used when we authenticated to the API. Depending upon your requirements your application may want to use OAuth to capture the credentials of another user and send an SMS on their behalf. For this scenario however, we are going to keep things simple and leave well enough alone.

```javascript tab="Javascript"
platform.login({
  username: process.env.RINGCENTRAL_USERNAME,
  extension: process.env.RINGCENTRAL_EXTENSION,
  password: process.env.RINGCENTRAL_PASSWORD
}).then(response => {
  //
})
```

```php tab="PHP"
<?php
platform = $rcsdk->platform();
$platform->login( getenv('RINGCENTRAL_USERNAME'),
                  getenv('RINGCENTRAL_EXTENSION'),
                  getenv('RINGCENTRAL_PASSWORD'));
?>
```

```python tab="Python"
platform = sdk.platform()
platform.login( os.getenv("RINGCENTRAL_USERNAME"),
                os.getenv("RINGCENTRAL_EXTENSION"),
                os.getenv("RINGCENTRAL_PASSWORD") )
```


### Troubleshooting

It is not uncommon for developers to need additional help when authenticating for the first time. If you have trouble, check the list below for help.

##### Are you authenticating using a personal phone number?

Bear in mind that the `RINGCENTRAL_USERNAME` environment variable should point to a RingCentral phone number, not your personal phone number. 

##### Are you authenticating using your company phone number?

If you authenticating using your company's main phone number, then you must also specify your user's phone extension in order to properly identify your account specifically. You do not need to specify an extension if you are authenticating using your direct line. 

## Send an SMS

After authentication, the `platform` object has now been seeded with an authorization token allowing you to access all the APIs your application has permission to use. So now, it's time to send an SMS. The API allows you to identify:

* the sender
* one or more recipients
* the message to send

```javascript tab="Javascript"
platform.post('/account/~/extension/~/sms', {
  from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
  to: [
    { phoneNumber: process.env.RINGCENTRAL_RECEIVER }
  ],
  text: 'Message content'
})
```

```php tab="PHP"
<?php
$r = $platform->post('/account/~/extension/~/sms', array(
    'from' => array('phoneNumber' => getenv('RINGCENTRAL_USERNAME')),
    'to' => array(
        array('phoneNumber' => getenv('RINGCENTRAL_RECEIVER')),
    ),
    'text' => 'Message content',
));
?>
```

```python tab="Python"
response = platform.post('/restapi/v1.0/account/~/extension/~/sms', {
   'from': {'phoneNumber': os.getenv("RINGCENTRAL_USERNAME")},
   'to': [{'phoneNumber': toNumber}],
   'text': message
})
```


### SMS Sending Numbers

The phone number used to identify the sender of the message must have permission or the authority to send an SMS. To determine which phone numbers a user can use to send and receive SMS, retrieve the user's list of phone numbers from the extension/phone-number endpoint and then filter that list by numbers with the `SmsSender` feature. A user record might look like the below. Note the `features` element which identified if the corresponding phone number can send an SMS. 

```json
{
  "uri":"<URI value>",
  "records":[{
    "id":33333333,
    "phoneNumber":"+16505551212",
    "paymentType":"Local",
    "type":"VoiceFax",
    "usageType":"DirectNumber",
    "features":[
      "SmsSender",
      "CallerId"
    ],
    "status":"Normal",
    "country":{
      "uri":"<URI value>",
      "id":"1",
      "name":"United States"
    }
  }]
}
```

## Processing the Response

Upon successfully sending the SMS, you may want to take additional action. For example, you may want to log that the SMS was sent as shown in this sample application. Other things you may want to do:

* Register the SMS being sent within an analytics system.
* Update a status record in your database.
* Etc.

If an error occurs in this step, it will be caught and handled on line 28.

```javascript hl_lines="7 8 9 10 11"
platform.post('/account/~/extension/~/sms', {
  from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
  to: [
    { phoneNumber: process.env.RINGCENTRAL_RECEIVER }
  ],
  text: 'Message content'
}).then(response => {
  console.log('SMS sent: ' + response.json().id)
}).catch(e => {
  console.error(e)
})
```

### Sample Response

```json
{
  "uri":"<URI value>",
  "id" : 315450330010,
  "to" : [ {
    "phoneNumber" : "+18551003738"
  } ],
  "from" : {
    "phoneNumber" : "+18559100010"
  },
  "type" : "SMS",
  "creationTime" : "2012-09-13T15:21:08.000Z",
  "readStatus" : "Unread",
  "priority" : "Normal",
  "attachments" : [ {
    "id" : 1,
    "uri":"<URI value>",
    "contentType" : "text/plain"
  } ],
  "direction" : "Outbound",
  "availability" : "Alive",
  "subject" : "Test SMS message from Platform server",
  "messageStatus" : "Sent",
  "conversationId" : 4481650717038104652,
  "lastModifiedTime" : "2012-09-13T15:21:09.000Z"
}
```

## Download an Image

First, let's find an image to send. Kittens FTW. Right click on the image below and save it to your project directory. 

![Kittens](../test.jpg)

## Sending an Image

Just as we did before, let's create a new file called `semd-mms.js` using the contents below.

```javascript
const SDK = require('ringcentral')
const dotenv = require('dotenv')
const FormData = require('form-data')

dotenv.config()

const rcsdk = new SDK({
    server: process.env.RINGCENTRAL_SERVER_URL,
    appKey: process.env.RINGCENTRAL_CLIENT_ID,
    appSecret: process.env.RINGCENTRAL_CLIENT_SECRET
})

const platform = rcsdk.platform()

platform.login({
    username: process.env.RINGCENTRAL_USERNAME,
    extension: process.env.RINGCENTRAL_EXTENSION,
    password: process.env.RINGCENTRAL_PASSWORD
}).then(response => {
    const formData = new FormData()
    const body = {
        from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
        to: [
            { phoneNumber: process.env.RINGCENTRAL_RECEIVER }
        ],
        text: 'Message content'
    }
    formData.append('json', Buffer.from( JSON.stringify(body) ), {
        filename: 'request.json',
        contentType: 'application/json'
    })
    formData.append('attachment', require('fs').createReadStream('./docs/test.jpg'))
    platform.post('/account/~/extension/~/sms', formData).then(response => {
        console.log('MMS sent: ' + response.json().id)
    }).catch(e => {
        console.error(e)
    })
}).catch(e => {
    console.error(e)
})
```

This script will work right out of the box. So let's first run it, and then walk-through the code in more detail to understand how it worked. 

```
$ node send-mms.js
```

You should see the message Id output to the screen, and shortly an SMS will arrive on the recipient's phone.

Next we will walk through this file to highlight the key differences from sending a purely text message. 

## Loading FormData

The FormData library is used to read files from the file system and attach them to your SMS message. This library is already declared in your `package.json` and was installed earlier when you ran the command:

```
$ yarn install
```

## Creating the Attachments

To send an image, we need to package the text message and image file as attachments.

```
const formData = new FormData()
const body = {
    from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
    to: [
        { phoneNumber: process.env.RINGCENTRAL_RECEIVER }
    ],
    text: 'Message content'
}
formData.append('json', Buffer.from( JSON.stringify(body) ), {
    filename: 'request.json',
    contentType: 'application/json'
})
formData.append('attachment', require('fs').createReadStream('./docs/test.jpg'))
platform.post('/account/~/extension/~/sms', formData).then(response => {
    console.log('MMS sent: ' + response.json().id)
}).catch(e => {
    console.error(e)
})
```

### Attaching the Text Message

* The text message is the first attachment we make, and we attach the file as `application/json`.
* We then attach the image by reading it off of the file system.
* Finally, we transmit the message.

## How to track delivery status of message

Once a message has been sent, you can check to see if it was successfully delivered.

```
const SDK = require('ringcentral')
const dotenv = require('dotenv')

dotenv.config()

const rcsdk = new SDK({
  server: process.env.RINGCENTRAL_SERVER_URL,
  appKey: process.env.RINGCENTRAL_CLIENT_ID,
  appSecret: process.env.RINGCENTRAL_CLIENT_SECRET
})

const platform = rcsdk.platform()

platform.login({
  username: process.env.RINGCENTRAL_USERNAME,
  extension: process.env.RINGCENTRAL_EXTENSION,
  password: process.env.RINGCENTRAL_PASSWORD
}).then(response => {
  platform.post('/account/~/extension/~/sms', {
    from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
    to: [
      { phoneNumber: process.env.RINGCENTRAL_RECEIVER }
    ],
    text: 'Message content'
  }).then(response => {
    const messageId = response.json().id
    platform.get(`/account/~/extension/~/message-store/${messageId}`).then(response => {
      console.log(response.json().messageStatus)
    })
  }).catch(e => {
    console.error(e)
  })
}).catch(e => {
  console.error(e)
})
```

In the example above, you should observe how the basic structure of the script mirrors that of the previous examples. We initialize the client, authenticate, and so forth. Let's begin as before: create a new file called `track-status.js` using the contents above. Then, let's run the script, and then follow up by explaining what is going on. 

```
$ node track-status.js
```

Running the above script should result in a response saying the message's status is "Queued." A message will be delivered to the recipient shortly, at which point the status will change to "Delivered."

## Checking the Status

This script is closely related to our first, 'send-sms.js`, except this script performs an additional step after the message is sent. 

### Display its Status

We retrieve the message ID returned to us when we sent the message. We then use that message ID when we place a call to the `message-store` endpoint. A typical response will look something like this:

```json
{
  "uri":"<URI value>",
  "id" : 60279564004,
  "to" : [ {
    "phoneNumber" : "+16505393204",
    "location" : "San Mateo, CA"
  } ],
  "from" : {
    "phoneNumber" : "+18889450052"
  },
  "type" : "SMS",
  "creationTime" : "2015-02-18T13:24:50.000Z",
  "readStatus" : "Read",
  "priority" : "Normal",
  "attachments" : [ {
    "id" : 60279564004,
    "uri":"<URI value>",
    "type" : "Text",
    "contentType" : "text/plain"
  } ],
  "direction" : "Outbound",
  "availability" : "Alive",
  "subject" : "Flight information",
  "messageStatus" : "Sent",
  "smsSendingAttemptsCount" : 1,
  "conversationId" : 5578984350117917661,
  "lastModifiedTime" : "2015-02-18T13:24:50.300Z"
}
```

If the message was sent properly, then the text "Delivered" will be printed to the console. 

## Message Histories

Create a file called `retrieve-modify.js` using the contents below.

```
const SDK = require('ringcentral')
const dotenv = require('dotenv')

dotenv.config()

const rcsdk = new SDK({
  server: process.env.RINGCENTRAL_SERVER_URL,
  appKey: process.env.RINGCENTRAL_CLIENT_ID,
  appSecret: process.env.RINGCENTRAL_CLIENT_SECRET
})

const platform = rcsdk.platform()

platform.login({
  username: process.env.RINGCENTRAL_USERNAME,
  extension: process.env.RINGCENTRAL_EXTENSION,
  password: process.env.RINGCENTRAL_PASSWORD
}).then(response => {
  platform.get('/account/~/extension/~/message-store', {
    dateFrom: '2018-04-20T06:33:00.000Z'
  }).then(response => {
    const messages = response.json().records
    console.log(`Retrieving ${messages.length} messages`)
    const message = messages[0]
    platform.put(`/account/~/extension/~/message-store/${message.id}`, {
      readStatus: 'Read'
    }).then(response => {
      console.log(`Message status has been changed to ${response.json().readStatus}`)
    }).catch(e => {
      console.error(e)
    })
    platform.delete(`/account/~/extension/~/message-store/${message.id}`).then(response => {
      console.log(`Message ${message.id} has been deleted`)
    }).catch(e => {
      console.error(e)
    })
  }).catch(e => {
    console.error(e)
  })
}).catch(e => {
  console.error(e)
})
```

Then run the script.

```
$ node retrieve-modify.js
```

You will see that a message has been deleted, and a status changed. Let's explore this in more detail so you understand what happened.

## Retrieve and Modify the Message History

### Retrieve the List

```
const SDK = require('ringcentral')
const dotenv = require('dotenv')

dotenv.config()

const rcsdk = new SDK({
  server: process.env.RINGCENTRAL_SERVER_URL,
  appKey: process.env.RINGCENTRAL_CLIENT_ID,
  appSecret: process.env.RINGCENTRAL_CLIENT_SECRET
})

const platform = rcsdk.platform()

platform.login({
  username: process.env.RINGCENTRAL_USERNAME,
  extension: process.env.RINGCENTRAL_EXTENSION,
  password: process.env.RINGCENTRAL_PASSWORD
}).then(response => {
  var handler = function (msg) {
    console.log(msg)
    platform.post('/account/~/extension/~/sms', {
      from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
      to: [
        { phoneNumber: msg.body.from.phoneNumber }
      ],
      text: 'This is an automatic reply'
    }).then(response => {
      console.log('SMS replied: ' + response.json().id)
    }).catch(e => {
      console.error(e)
    })
  }
  const subscription = rcsdk.createSubscription()
  subscription.on(subscription.events.notification, handler)
  subscription
    .setEventFilters(['/account/~/extension/~/message-store/instant?type=SMS'])
    .register().then(response => {
      console.log(response.json())
    })
}).catch(e => {
  console.error(e)
})
```

In this example, we retrieve a list of messages and pick the first one in the list to modify. In your application, you almost certainly will rely on different logic, but the basic pattern is the same. Here we retrieve a list of messages sent after a specific date. Then we just arbitEventFilters(['/account/~/extension/~/message-store/instant?type=SMS'])
    .register().then(response => {
          console.log(response.json())
	      })
	      }).catch(e => {
	        console.error(e)
		})~trarily choose the first message returned to us. 

### Update Message Status

Next, we update the record using HTTP `PUT`. We transmit only the properties we want to change. In this case, we set `readStatus` to "Read" and then visually confirm that the status was changed by outputting the status returned to us in the response. 

## Deleting a Message

Deleting a message is done via the HTTP `DELETE` method.

### Next Up

Next, we will learn how to respond to an SMS message that we receive. 

## Replying to an SMS Message

Create a file called `receive-reply.js` using all the contents below.

```
const SDK = require('ringcentral')
const dotenv = require('dotenv')

dotenv.config()

const rcsdk = new SDK({
  server: process.env.RINGCENTRAL_SERVER_URL,
  appKey: process.env.RINGCENTRAL_CLIENT_ID,
  appSecret: process.env.RINGCENTRAL_CLIENT_SECRET
})

const platform = rcsdk.platform()

platform.login({
  username: process.env.RINGCENTRAL_USERNAME,
  extension: process.env.RINGCENTRAL_EXTENSION,
  password: process.env.RINGCENTRAL_PASSWORD
}).then(response => {
  var handler = function (msg) {
    console.log(msg)
    platform.post('/account/~/extension/~/sms', {
      from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
      to: [
        { phoneNumber: msg.body.from.phoneNumber }
      ],
      text: 'This is an automatic reply'
    }).then(response => {
      console.log('SMS replied: ' + response.json().id)
    }).catch(e => {
      console.error(e)
    })
  }
  const subscription = rcsdk.createSubscription()
  subscription.on(subscription.events.notification, handler)
  subscription
    .setEventFilters(['/account/~/extension/~/message-store/instant?type=SMS'])
    .register().then(response => {
      console.log(response.json())
    })
}).catch(e => {
  console.error(e)
})
```

Then run the script:

```
$ node receive-reply.js
```

This script will start and then wait until an SMS is received. Let's trigger the app to send an SMS in reply to one we send. Send an SMS from your personal phone to the phone number you set `RINGCENTRAL_USERNAME` to. You should shortly receive an auto-response to your phone.

Here is how it works...

### Create a Handler

First, we create a function to send the auto-response. This function will receive as input the message that we will be responding to. We use this message to set the recipient of our response. 

```
var handler = function (msg) {
    console.log(msg)
    platform.post('/account/~/extension/~/sms', {
      from: { phoneNumber: process.env.RINGCENTRAL_USERNAME },
      to: [
        { phoneNumber: msg.body.from.phoneNumber }
      ],
      text: 'This is an automatic reply'
    }).then(response => {
      console.log('SMS replied: ' + response.json().id)
    }).catch(e => {
      console.error(e)
    })
  }
```

## Creating an Event Subscription

Once the handler has been created, we need to bind it to the receipt of an SMS message. We do that by:

* Create a subscription object
* Listen for the `subscription.events.notification` event, and bind it to our handler. 
* Set the event filter to the receipt of SMS message specifically.
* Register the subscription.

```
const subscription = rcsdk.createSubscription()
subscription.on(subscription.events.notification, handler)
subscription
  .setEventFilters(['/account/~/extension/~/message-store/instant?type=SMS'])
  .register().then(response => {
    console.log(response.json())
  })
```

### Event Filters

For a full list of available event filters, please refer to our [API Reference](https://developer.ringcentral.com/api-docs/latest/index.html#!#EventTypes.html).

### WebHook

The subscription we created above uses [PubNub](https://www.pubnub.com/).

There is also a [WebHook way to do subscription](http://ringcentral-api-docs.readthedocs.io/en/latest/notifications_webhooks/). We won't dive into detail here. You can click the link to read more.

## Congratulations!

And that's it. You should have successfully build a number of the components of an SMS application.