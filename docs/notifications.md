# Notifications and Subscriptions

There are two strategies of client-service interaction providing data renewal: poll and push. Polling implies that the client periodically queries the server in order to get the updated data. Pushing implies that the server immediately sends notifications to the client on any data update. RingCentral API supports both types of data renewal. However in case of rarely changing data push notifications are evidently more effective, as they reduce client-server traffic, server load and improve user experience by notifying client applications on-the-fly with a minimal delay about important events.

For example, for getting new messages the client application can periodically poll the server in order to get updates via incremental synchronization. However push notifications delivered immediately when the new messages appear are much more convenient. To start receiving push notifications the client application should subscribe for the required events; in this case, for the new messages.

The RingCentral API supports receiving push notifications for its clients of any type, including but not limited to mobile applications (smartphones and tablets running Android/iOS), desktop applications (for example, softphone for Windows/Mac), server-side applications hosted in a cloud, HTML5 applications, etc.

The typical subscription flow is performed as follows:

- A client application subscribes to the required events through the RingCentral API. In response the server provides all necessary information for the application to connect to the transport facilities that deliver the notifications: channel address; if required - credentials to access the channel, and notification payload encryption keys.

- The server starts to push events to the dedicated channel after the subscription is created. The delivery mechanism PubNub queues a certain amount of notifications, awaiting a client to get them.

- The client can unsubscribe explicitly at any time through the API. In this case the server immediately stops sending push notifications for this client.

- Each subscription has an expiration time and needs to be renewed explicitly by the client through the API call. If subscription is expired, the server silently stops sending push notifications for this client. The server may change any information it has to provide to client upon subscription renewal. Any changes are provided in the renewal response.

# Subscription Flow

To use RingCentral Push Notifications the client application can create a notifications subscription that can further be retrieved, changed or deleted by the client via the API requests. Let's consider the subscription flow step-by-step:

1. Authorization

2. Subscription creation

3. Notifications handling

4. Subscription renewal

5. Event Filters Modification

6. Unsubscribing

## Authorization

When a client creates a subscription it must be authenticated and authorized to use the RingCentral API. It includes, at least, application authentication. Certain event filter requires the client to be authorized to access specific extension data, so the client needs to pass a valid access token in the request. For more details please refer to the [Authentication](oauth.md) section.

## Subscription Creation

To create a subscription the client application should send the following request:

    POST /restapi/v1.0/subscription HTTP/1.1

In request body the client should specify event filters and delivery mode.

By setting **event filters** the client specifies the notifications it wants to receive. The event filter is exposed as a URL, pointing to the RingCentral API resource which represents the data for which a notification is sent. Currently the following event types are available: messages and presence (see API Reference: [Event Types](https://developers.ringcentral.com/api-docs/latest/EventTypes.html)).

The **delivery mode** specifies the certain mechanism used to deliver event notification from the RingCentral service to the client application. Delivery mechanism can be selected by specifying `deliveryMode.transportType` attribute; currently only one transport channel is supported: the [PubNub cloud service](http://www.pubnub.com), which utilizes HTTP(s) long polling, web socket, and APNS transports for delivering push notifications (for more details see [Notifications Transport](#notifications-transport)).

In response the server provides the client with:

-   identity of the subscription created, and its creation and expiration time; the exact event filters used for the subscription (in case it substituted the default value for some event attribute);

-   delivery mode, including:

    - transport type;

    - address - channel name to subscribe to;

    - subscriber key and secret key - subscriber credentials required to subscribe to the channel;

    - encryption information.

Some event types provide sensitive data in the notification payload, which should be protected from unauthorized access. Whenever such an event type is requested in `eventFilters`, encryption is forced on the notifications channel, resulting in all notifications (including those that do not contain sensitive data) to be encrypted. To indicate the encryption mode for a new or renewed subscription, the server specifies the following attributes under `deliveryMode`: `encryptionAlgorithm` — name of the specific encryption mechanism, "None" by default. Available encryption mechanisms: `encryptionKey` — key to be used by the client to decode the notification payload. Encryption can also be forced by specifying `deliveryType.encryption = true` in subscription creation request.

Consider the following subscription creation request:

```
POST .../restapi/v1.0/subscription

{
    "eventFilters": [
        "/restapi/v1.0/account/~/extension/401550809004/presence?detailedTelephonyState=true"
    ],
    "deliveryMode": {
      "transportType": "PubNub"
    }
}
```      

In response to this request the client application will get all the required information to subscribe to a certain PubNub channel (see PubNub section below to get more information about PubNub subscribing) and receive push notifications for the selected event (extension presence in this case):

```
HTTP/1.1 200 OK

{
  "eventFilters" : [ "/restapi/v1.0/account/~/extension/401550809004/presence?detailedTelephonyState=true" ],
  "id" : "78c53776-6aa5-4089-b080-150089c097bf",
  "deliveryMode" : {
    "transportType" : "PubNub",
    "encryption" : true,
    "address" : "96830102602705_0d0115d5",
    "subscriberKey" : "sub-c-b8b9cd8c-e906-11e2-b383-02ee2ddab7fe",
    "encryptionAlgorithm" : "AES",
    "encryptionKey" : "fNP0fszFJdc/thDO90/B3A=="
  },
  "expirationTime" : "2013-09-13T13:58:57.187Z",
  "status" : "Active",
  "creationTime" : "2013-09-13T13:43:57.187Z",
  "uri" : "/restapi/v1.0/subscription/78c53776-6aa5-4089-b080-150089c097bf"
}
```
        
## Notifications Handling

Push notifications will be delivered to the client application via the delivery mechanism specified in subscription. Each notification has the same common structure, which can be easily described with a simple example:

```
{
   "uuid":"ed1cf00c-0420-4bf5-a0ae-e659bb9f77e0",
   "event": "/restapi/v1.0/account/~/extension/823476228762/message-store",
   "timestamp": "2013-06-14T12:00:00.000Z",
   "body": {
            /* depends on event type, may even be omitted, if event does not need a payload. */
           }
}
```          
 
According to received notification the client application should either update local data or notify user about data changes (for example, new messages received).

## Subscription Renewal

Created subscription should be renewed according to its expiration time by special request, otherwise it would not be sent to the client application after subscription expiration. After renewal any parameter of subscription may be changed, so it should be updated on a client side as well. To renew the subscription use the following request:

    POST /restapi/v1.0/subscription/{subscriptionId}/renew

---

**Note**

It is recommended to renew a subscription around 1-2 minutes before it is expired. The client should be aware that there may be strict throttling settings on subscriptions operations.

---

## Event Filters Modification

In order to subscribe to any other events the client application can create additional subscriptions, but it is preferable to update the already existing subscription with the new event filters. To make this subscription modification the following request should be used:

```
PUT /restapi/v1.0/subscription/{subscriptionId}

{
    "eventFilters": [
       "/restapi/v1.0/account/~/extension/12345/presence",
       "/restapi/v1.0/account/~/extension/98765/presence",
       "/restapi/v1.0/account/~/extension/~/message-store"
     ]
}
```  

## Unsubscribing

If the application does not need to receive push notifications anymore due to some reason, it should unsubscribe from notifications through special API call. The existing subscription can be deleted as follows:

```
DELETE /restapi/v1.0/subscription/78c53776-6aa5-4089-b080-150089c097bf HTTP/1.1
Accept: application/json
Authorization: Bearer U0pDMDFQMDFKV1MwMnxXEhpuK23FJtRSi_rafOgPSMOorQ
```
 
The response will be the following:

    HTTP/1.1 204 No Content

# Notifications Transport

The system requires a certain transportation mechanism to deliver event notifications from the RingCentral service to the client application. Currently the API uses the PubNub cloud service as a transportation channel.

The PubNub delivery mode uses external service provider PubNub. This provider uses WebSocket, HTTP long-polling, or Apple Push Notifications transports to deliver notifications. It is specifically well suited for web, standalone and mobile applications, and provides an extensive set of client libraries for all of these platforms.

To use this mechanism the client should specify PubNub as a value of `deliveryMode.transportType` attribute. In response the server provides the following information to be used to connect to PubNub channel:

- `address` — PubNub channel name to subscribe to;

- `subscriberKey` — PubNub subscriber credentials required to subscribe to the channel.

The client uses this information to properly configure the PubNub client library and subscribe to the channel.

PubNub provides SDKs for many popular operating systems and frameworks: iOS, Android, Ruby, JavaScript, Java, Objective C, .Net etc. You can find full list of SDKs on the page [http://www.pubnub.com/developers/](http://www.pubnub.com/developers/). PubNub HTTP REST API can be also used as well. For example, to subscribe for push notifications with channel (address) and credentials (subscriberKey) provided by RingCentral API as it described above, you can use the following HTTP request:

    GET http://pubsub.pubnub.com/subscribe/{subscriberKey}/{address}/{callback}/{timetoken}

You can find full PubNub REST API description on this page [http://www.pubnub.com/http-rest-push-api/](http://www.pubnub.com/http-rest-push-api/).