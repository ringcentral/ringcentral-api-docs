# Call Control JS SDK

[RingCentral Call Control JS SDK](https://github.com/ringcentral/ringcentral-call-control-js) is wrapper of RingCentral JS SDK to help developer call [RingCentral Call Control API](https://developers.ringcentral.com/api-reference/Call-Control/) more functionally.

!!! tip "Prerequisites"
    Create a free RingCentral app in [here](https://developers.ringcentral.com/).

    * App type: Browser-Based or Server/Web
    * Permissions: `Call Control`, `Read Accounts`, `Read Presence`, `Webhook Subscriptions`
  
## Supported features:

We added the following key features to do the heavy lifting for you.

* Call session management. Load existing call sessions and manage call session lifecycle
* Call session event. Handle telephony session event, sync status
* Session functional API. Request call control API with function
* Devices management. Load user’s devices

## Installation

Use npm or yarn

```bash
$ yarn add @ringcentral/sdk @ringcentral/subscriptions ringcentral-call-control
```

From CDN

```html
<script type="text/javascript" src="https://unpkg.com/es6-promise@latest/dist/es6-promise.auto.js"></script>
<script type="text/javascript" src="https://unpkg.com/pubnub@latest/dist/web/pubnub.js"></script>
<script type="text/javascript" src="https://unpkg.com/whatwg-fetch@latest/dist/fetch.umd.js"></script>
<script type="text/javascript" src="https://unpkg.com/@ringcentral/sdk@latest/dist/ringcentral.js"></script>
<script type="text/javascript" src="https://unpkg.com/@ringcentral/subscriptions@latest/dist/ringcentral-subscriptions.js"></script>
<script type="text/javascript" src="https://unpkg.com/ringcentral-call-control@0.2.1/build/index.js"></script>
```

## Quickstart

The SDK is based on the RingCentral JS SDK. We use it to authorize and create a server-side subscription — see code example below:

```js
// import RingCentral JS SDK
import { SDK as RingCentralSDK } from '@ringcentral/sdk';
import { Subscriptions } from "@ringcentral/subscriptions";

// import RingCentral Call Control SDK
import { RingCentralCallControl } from 'ringcentral-call-control';

var appClientId = '...'; 
var appClientSecret = '...';
var appName = '...';
var appVersion = '...';

// Init RingCentral JS SDK
var sdk = new RingCentralSDK({
  clientId: appClientId,
  clientSecret: appClientSecret,
  appName: appName,
  appVersion: appVersion,
  server: RingCentralSDK.server.production // or .sandbox
});
// Init RingCentral JS Subscriptions SDK 
var subscriptions = new Subscriptions({
  sdk: sdk
});
var platform = sdk.platform();

platform
  .login({
    username: '...',
    password: '...'
  })
  .then(function() {
    // init RingCentral Call Control SDK after user login
    var rcCallControl = new RingCentralCallControl({ sdk: sdk });

    var subscription = subscriptions.createSubscription();

    // subscribe telephony/sessions event
    subscription.setEventFilters(['/restapi/v1.0/account/~/extension/~/telephony/sessions']);
    subscription.on(subscription.events.notification, function(msg) {
       // pass server-side notification to RingCentral Call Control SDK
       rcCallControl.onNotificationEvent(msg)
    });
    subscription.register(); // start server-side notification subscription
    return rcCallControl;
  })
```

To listen to the call session event you can use this code:

```js
var session = null;

rcCallControl.on('new', (newSession) => {
  session = newSession;
});
session.on('status', (event) => {
  // on status changed
  var party = event.party;
  var status = party.status;
  // ...
});
```

To get the call session list all you need to do is use this single line of code:

```js
var sessions = rcCallControl.sessions;
```

To control the call session use this code below:

```js
session.drop().then(...);
session.mute().then(...);
session.hold().then(...);
session.toVoicemail().then(...);
```

Get full document of session API [here](https://github.com/ringcentral/ringcentral-call-control-js#session-api).

## Online Demo

We created an online demo that you can check out on this [Github page](https://ringcentral.github.io/ringcentral-call-control-js/).

!!! tip "Setup Demo"
    Firstly, please create a free RingCentral app in [RingCentral Developers website](https://developers.ringcentral.com/).

    * App type: Browser-Based or Server/Web
    * Permissions: `Call Control`, `Read Accounts`, `Read Presence`, `Webhook Subscriptions`
    * Add redirect uri `https://ringcentral.github.io/ringcentral-call-control-js/redirect.html` into your app

### Make a call

![Make a Call](../../img/callcontroljssdk-demo-make-call.png)

### Call Control

![Control a Call](../../img/callcontroljssdk-demo-call-control.jpg)
