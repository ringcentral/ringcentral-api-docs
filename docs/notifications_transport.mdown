The system requires a certain transportation mechanism to deliver event notifications from the RingCentral service to the client application. Currently the API uses the PubNub cloud service as a transportation channel.

The PubNub delivery mode uses external service provider PubNub. This provider uses WebSocket, HTTP long-polling, or Apple Push Notifications transports to deliver notifications. It is specifically well suited for web, standalone and mobile applications, and provides an extensive set of client libraries for all of these platforms.

To use this mechanism the client should specify PubNub as a value of `deliveryMode.transportType` attribute. In response the server provides the following information to be used to connect to PubNub channel:

- `address` — PubNub channel name to subscribe to;

- `subscriberKey` — PubNub subscriber credentials required to subscribe to the channel.

The client uses this information to properly configure the PubNub client library and subscribe to the channel.

PubNub provides SDKs for many popular operating systems and frameworks: iOS, Android, Ruby, JavaScript, Java, Objective C, .Net etc. You can find full list of SDKs on the page [http://www.pubnub.com/developers/](http://www.pubnub.com/developers/). PubNub HTTP REST API can be also used as well. For example, to subscribe for push notifications with channel (address) and credentials (subscriberKey) provided by RingCentral API as it described above, you can use the following HTTP request:

    GET http://pubsub.pubnub.com/subscribe/{subscriberKey}/{address}/{callback}/{timetoken}

You can find full PubNub REST API description on this page [http://www.pubnub.com/http-rest-push-api/](http://www.pubnub.com/http-rest-push-api/).
