# Subscribing to events via WebSockets

WebSockets provide a medium by which event notifications can be delivered to an application via a persistent, low-latency network connection. This allows applications to receive notifications of events of interest to them in near real-time. In the guide that follows, we will describe how developers can subscribe to events over WebSockets, and how to process events that are received. 

If you are new to Websockets, we recommend you to begin your learning journey with an [online tutorial](https://www.youtube.com/watch?v=8ARodQ4Wlf4) about the protocol and technology. 

## Assigning the WebSocketsSubscription app scope to your application

Before any application that wishes to subscribe to an event via WebSockets, the app must first possess the `WebSocketsSubscription` [app scope](../../basics/permissions.md). This will allow associated apps to call the necessary endpoints to establish a connection to a RingCentral WebSockets server. 

## Subscribing to events via an SDK

If you are using one of [RingCentral's officially supported SDKs](../../sdks.md), then subscribing to events couldn't be easier as the SDKs manage much of the complexity for you. All you need to do is process events as they come in over the WebSocket. To learn how to subscribe to events using the SDKs, checkout our [WebSockets Quick Start guide](quick-start.md).

## Subscribing to events manually

If you need to implement your own subscription layer for WebSockets, or if you simply want to better understand what is happening behind the scenes, then the follow material will help you. 

### Obtaining a WebSocket access token and server URL

A WebSocket access token is required in order to open up a connection with a RingCentral WebSockets server. To obtain a WebSocket access token, you must first obtain an API access token via one of our established authorization mechanisms (e.g. [OAuth](../../authentication/auth-code-flow.md) or [JWT](../../authentication/jwt-flow.md). Using that access token, you will request a WebSockets access token and server URL through the following request.

```http
POST /restapi/oauth/wstoken HTTP/1.1
Authorization: Bearer <access token>
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

The WebSockets access token that is returned is good for a single-use only when connecting to the WebSockets server specified in the `uri` response property. 

### Connecting to the WebSockets server

With an access token and server URL in hand, you can now connect to the WebSockets server to begin receiving events. We recommend utilizing a freely available third-party WebSockets library to aid in the processing of incoming events. 

To connect to the WebSockets server, you will need to compose the server URL by appending the server URI with the access token in the following way:

```
wss://servername.ringcentral.com/ws?access_token=U0pDMDFQMDdQQxxxxxxxxx9pSU9OemVzakpn
```

When a connection is successfully made, the WebSockets server will transmit a `ConnectionDetails` message similar to the following:

```js
{! code-samples/websockets/connection-details.json !}
```

??? hint "Make note of the wsc token to aid in session recovery"
    In the above example on line 7 a `wsc` `token` value is provided ("RTFhRG5nfExxxxxxxxxxxcHE3bXkyRURQVQ"). It is important for clients to make note of this value as it may be needed to recover a lost session/connection with the WebSocket server. See "Recovering WebSocket sessions" below. 

### Subscribe to events

With a connection to the WebSockets server now established, you can transmit your own message to the server specifying the events you wish to subscribe to. Unlike a webhook subscription which is a persistent and managed by RingCentral servers, a WebSockets event subscription is only valid while the WebSocket connection and client is active. If for whatever reason you lose your connection to the WebSockets server and need to re-establish connectivity, you will need to resubscribe to the events you are in need of. 

To subscribe to events, you will need to transmit a `ClientRequest` specifying the [event filters](../event-filters/index.md) you wish to subscribe to. For example, the following will subscribe to incoming SMS and incoming voicemail events. 

```js
{! code-samples/websockets/subscription-request.json !}
```

!!! warning "Only one subscription per server"
    It is important to bear in mind that any given WebSocket server can only have a single active subscription. If you transmit a second subscription request, presumably with a different set of event filters, then any other subscriptions will be cancelled and replaced with the new subscription request. 

!!! hint "There is no need to refresh WebSocket subscriptions"
    You may notice that in the event subscription response fields relating to the expiration of the subscription. You can safely ignore these fields as WebSocket event subscriptions renew automatically on the backend. 
	
