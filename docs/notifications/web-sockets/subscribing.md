# Subscribing to events via Web Sockets

Web Sockets provide a medium by which event notifications can be delivered to an application via a persistent, low-latency network connection. This allows applications to receive notifications of events of interest to them in near real-time. In the guide that follows, we will describe how developers can subscribe to events over Web Sockets, and how to process events that are received. 

If you are new to Web Sockets, we recommend you to begin your learning journey with an [online tutorial](https://www.youtube.com/watch?v=8ARodQ4Wlf4) about the protocol and technology. 

## Subscribing to events via an SDK

If you are using one of [RingCentral's officially supported SDKs](../../sdks/), then subscribing to events couldn't be easier as the SDKs manage much of the complexity for you. All you need to do is process events as they come in over the Web Socket. To learn how to subscribe to events using the SDKs, checkout our [Web Sockets Quick Start guide](../quick-start/).

## Subscribing to events manually

If you need to implement your own subscription layer for Web Sockets, or if you simply want to better understand what is happening behind the scenes, then the follow material will help you. 

### Assigning the proper app scope to your application

First, any app that wishes to subscribe to an event via Web Sockets must possess the `WebSocketsSubscription` [app scope](../../basics/permissions/). This will allow apps to call the necessary endpoints to establish a connect to a RingCentral Web Sockets server. 

### Obtaining a Web Socket access token and server URL

A Web Socket access token is required in order to open up a connection with a RingCentral Web Sockets server. To obtain a Web Socket access token, you must first obtain an API access key via one of our established authorization mechanisms (e.g. [OAuth](../../authentication/auth-code-flow) or [JWT](../../authentication/jwt-flow/). Using that access key, you will request a Web Sockets access token and server URL through the following request.

```http
POST /restapi/oauth/wstoken HTTP/1.1
Authorization: Bearer <access key>
```

If successful, RingCentral will respond with something similar to the following:

```http
HTTP/1.1 200 OK
Content-type: application/json
 
{
  "ws_access_token": "U0pDMDFQMDdQQxxxxxxxxx9pSU9OemVzakpn",
  "uri": "wss://servername.ringcentral.com/ws",
  "expires_in": 30
}
```

The Web Sockets access token that is returned is good for a single-use only when connecting to the Web Sockets server specified in the `uri` response property. 

### Connecting to the Web Sockets server

With an access token and server URL in hand, you can now connect to the Web Sockets server to begin receiving events. We recommend utilizing a freely available third-party Web Sockets library to aid in the processing of incoming events. 

To connect to the Web Sockets server, you will need to compose the server URL by appending the server URI with the access key in the following way:

```
wss://servername.ringcentral.com/ws?access_token=U0pDMDFQMDdQQxxxxxxxxx9pSU9OemVzakpn
```

When a connection is successfully made, the Web Sockets server will transmit a `ConnectionDetails` message similar to the following:

```js
{! code-samples/websockets/connection-details.json !}
```

??? hint "Make note of the wsc token to aid in session recovery"
    In the above example on line 7 a `wsc` `token` value is provided ("RTFhRG5nfExxxxxxxxxxxcHE3bXkyRURQVQ"). It is important for clients to make note of this value as it may be needed to recover a lost session/connection with the Web Socket server. See "Recovering Web Socket sessions" below. 

### Subscribe to events

With a connection to the Web Sockets server now established, you can transmit your own message to the server specifying the events you wish to subscribe to. Unlike a webhook subscription which is a persistent and managed by RingCentral servers, a Web Sockets event subscription is only valid while the Web Socket connection and client is active. If for whatever reason you lose your connection to the Web Sockets server and need to re-establish connectivity, you will need to resubscribe to the events you are in need of. 

To subscribe to events, you will need to transmit a `ClientRequest` specifying the [event filters](../../event-filters/) you wish to subscribe to. For example, the following will subscribe to incoming SMS and incoming voicemail events. 

```js
{! code-samples/websockets/subscription-request.json !}
```

!!! warning "Only one subscription per server"
    It is important to bear in mind that any given Web Socket server can only have a single active subscription. If you transmit a second subscription request, presumably with a different set of event filters, then any other subscriptions will be cancelled and replaced with the new subscription request. 

!!! hint "There is no need to refresh Web Socket subscriptions"
    You may notice that in the event subscription response fields relating to the expiration of the subscription. You can safely ignore these fields as Web Socket event subscriptions renew automatically on the backend. 
	
### Receiving event notifications

From this point forward over the existing Web Socket connection RingCentral will begin transmitting `ServerNotification` payloads corresponding to individual events that you have subscribed to. Like all Web Socket events, a server notification exists in two parts: the web socket meta data and the payload of the event. The event payload is identical to payloads received via a webhook subscription.

**Example Web Socket server notification**

```js
{! code-samples/websockets/websocket-notification.json !}
```

### Recovering a Web Sockets session

#### Obtain a new Web Socket access token

The client should obtain a new WS access token for WebSocket authorization by calling the /restapi/oauth/wstokenmethod.

#### Reconnect to the Web Socket server

The client should connect to WebSocket using WS access token and the URL with the embedded WSC token:

```
wss://servername.ringcentral.com/ws?access_token=<WS access token>&wsc=<WSC token>
```

Please note: The client must prevent any interaction via the initiated WebSocket connection until the 'ConnectionDetails' message is received.

#### Processing recovery results

As a result of session recovery attempt the client receives the `ConnectionDetails` message, including the `recoveryState` field:

```json
{! code-samples/websockets/session-recovery.json !}
```

If the `recoveryState` field value is `Successful` in the received `ConnectionDetails` message (see the example above) then the client can continue working as before disconnection. It means that the WebSocket session is successfully restored and all subscriptions are alive, and the client will receive all messages sent during the client unavailability within the limits of recovery buffer size. If the number of messages received during disconnection exceeds the supported limit of 100 messages (corresponds to `recoveryBufferSize` field value), then the client will receive only the latest ones.

If the `recoveryState` field is `Failed` it means the following:

* WebSocket session context is lost;
* notifications that could be received while the client was disconnected are lost;
* all subscriptions in the new session must be re-created.

If session recovery fails then the client needs to subscribe again for all the required events, however the WebSocket connection remains the same, there is no need to open a new one.


