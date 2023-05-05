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

    Upgrade [ringcentral-python](https://pypi.org/project/ringcentral/) to version TODO or later.
	
	**Before**
	```js
	```
	
	**After**
	```js
	```

=== "PHP"

    Upgrade [ringcentral-php]() to version TODO or later.
	
	**Before**
	```js
	```
	
	**After**
	```js
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
