# Migrating from PubNub to WebSockets

RingCentral's use of PubNub is officially deprecated and will eventually be discontinued. All developers are required to migrate their applications to use WebSockets instead. Depending upon how you have implemented PubNub, your migration path may vary, and this guide will hopefully put you on the right path. 

## Add the WebSocketsSubscription app scope to your app

With the introduction of WebSockets we are making another change to the platform. Currently we support a single app scope called Subscriptions, which we will breaking out into three distinct scopes:

* Webhook Subscriptions
* PubNub Subscriptions
* WebSockets Subscriptions

We are attempting to update everyone's apps on their behalf to ease the migration experience, but developers should double check their app and confirm that the necessary app scopes are present. If they are not, please add them. 

## Migrate your code to use WebSockets

In migrating away from PubNub, every developer will need to make as least some small change to their code. The size and nature of that change will depend almost entirely upon your specific implementation, which can fall into two main buckets.

#### Migrating code manually for self-built SDKs

Some developers choose not to use an SDK provided by RingCentral. If this is the case for you, then you will need to make a number of changes to switch to the WebSockets. We have two guides that walk through how we have implemented WebSockets to help you with this process:

* [Subscribing to WebSockets](../subscribing/)
* [Receiving events via WebSockets](../receiving/)

Even if you do not use a RingCentral SDK, we strongly recommend using a third-party library to help implement the WebSockets protocol.

#### Upgrading your RingCentral SDK

If you use a [RingCentral SDK](../../sdks/), then you will need to update the most recent version of that SDK, and make a few changes to your source code. The following will provide the SDK-specific instructions to guide you in this process. 

=== "Javascript"

    Upgrade [ringcentral-js](https://www.npmjs.com/package/@ringcentral/sdk) to version TODO or later.
	
    There are no code changes you will need to make. When you upgrade to the latest version of the SDK, it will automatically begin using WebSockets if you were once using PubNub. 
	
=== "Python"

    Upgrade [ringcentral-python](https://pypi.org/project/ringcentral/) to version 0.8.0 or later.
	
	**Before**
```python
import os
import sys

from dotenv import load_dotenv
from ringcentral import SDK
from multiprocessing import Process
from time import sleep
from ringcentral.subscription import Events
load_dotenv()

rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
try:
  platform.login( jwt=os.environ.get('RC_JWT') )
except Exception as e:
  sys.exit("Unable to authenticate to platform: " + str(e))

def on_message(msg):
    print (msg)

def pubnub():
    try:
        s = rcsdk.create_subscription()
        s.add_events([{FILTERS}]) # replace {FILTERS} with filter urls
        s.on(Events.notification, on_message)
        res = s.register()
        try:
            print("Wait for notification...")
        except Exception as e:
            print (e)
            sys.exit(1)
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
    sys.exit(1)
```

**After**
```python
from ringcentral import SDK
from dotenv import load_dotenv
import asyncio
import os
from ringcentral.websocket.events import WebSocketEvents

def on_notification(message):
    print(message)

def on_sub_created(sub):
    print(sub.get_subscription_info())

def on_ws_created(web_socket_client):
    print(web_socket_client.get_connection_info())

async def subscribe():
    load_dotenv(override=True)
    sdk = SDK(
        os.environ['RINGCENTRAL_CLIENT_ID'],
        os.environ["RINGCENTRAL_CLIENT_SECRET"],
        os.environ["RINGCENTRAL_SERVER_URL"],
    )
    platform = sdk.platform()
    platform.login(jwt=os.environ["RINGCENTRAL_JWT_TOKEN"])

    try:
        web_socket_client = sdk.create_web_socket_client()
        web_socket_client.on(WebSocketEvents.connectionCreated, on_ws_created)
        web_socket_client.on(WebSocketEvents.subscriptionCreated, on_sub_created)
        web_socket_client.on(WebSocketEvents.receiveSubscriptionNotification, on_notification)
        await asyncio.gather(
            web_socket_client.create_new_connection(), 
            web_socket_client.create_subscription([{FILTERS}]) # replace {FILTERS} with filter urls
        )
    except KeyboardInterrupt:
        print("Stopped by User")

```

=== "PHP"

    Upgrade [ringcentral-php](https://github.com/ringcentral/ringcentral-php) to version 3.0.0 or later.
	
	**Before**
```php
use RingCentral\SDK\Subscription\Events\NotificationEvent;
use RingCentral\SDK\Subscription\Subscription;

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

$subscription = $rcsdk->createSubscription('Pubnub');
$subscription->addEvents(array('/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'));
$subscription->addListener(Subscription::EVENT_NOTIFICATION, function (NotificationEvent $e) {
    print_r($e->payload()['body']);
});
$subscription->setKeepPolling(true);
$subscription->register();
```
	
	**After**
```php
<?php

use RingCentral\SDK\WebSocket\WebSocket;
use RingCentral\SDK\WebSocket\Subscription;
use RingCentral\SDK\WebSocket\Events\NotificationEvent;

$rcsdk = new RingCentral\SDK\SDK( $_ENV['RC_CLIENT_ID'],
                                  $_ENV['RC_CLIENT_SECRET'],
                                  $_ENV['RC_SERVER_URL'] );
$platform = $rcsdk->platform();
$platform->login( [ "jwt" => $_ENV['RC_JWT'] ] );

$websocket = $rcsdk->initWebSocket();
$websocket->connect();

$subscription = $rcsdk->createSubscription();
$subscription->addEvents(array('/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'));
$subscription->addListener(Subscription::EVENT_NOTIFICATION, function (NotificationEvent $e) {
    print 'Notification ' . print_r($e->payload(), true) . PHP_EOL;
});
$subscription->register();
```

=== "Java"

    Upgrade [ringcentral-java](https://mvnrepository.com/artifact/com.ringcentral/ringcentral) to version TODO or later.
	
	**Before**
	```js
	```
	
	**After**
	```js
	```

=== "C#"

    Upgrade [ringcentral-???]() to version TODO or later.
	
	**Before**
	```js
	```
	
	**After**
	```js
	```

=== "Ruby"

    Upgrade [ringcentral-ruby](https://rubygems.org/gems/ringcentral-sdk/versions/0.8.1) to version TODO or later.
	
	**Before**
	```js
    events = [
        '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS',
    ]
    subscription = PubNub.new($rc, events, lambda { |message|
        callback.call(message)
    })
    subscription.subscribe()
	```
	
	**After**
	```js
    events = [
        '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS',
    ]
    s = rcsdk.create_subscription()
    s.add_events( events )
    s.on( Events.notification, lambda { |message| 
	     callback.call(message) })
    res = s.subscribe()
	```

## Remove the PubNubSubscription app scope from your application

The final step in your migration is to remove the PubNub Subscription app scope from your app via the Developer Console. When this is done, PubNub will be disabled in your account, and your migration will be complete. 
