# Push Notifications

There are two strategies of client-service interaction providing data renewal: poll and push. Polling implies that the client periodically queries the server in order to get the updated data. Pushing implies that the server immediately sends notifications to the client on any data update. RingCentral API supports both types of data renewal. However in case of rarely changing data push notifications are evidently more effective, as they reduce client-server traffic, server load and improve user experience by notifying client applications on-the-fly with a minimal delay about important events.

For example, for getting new messages the client application can periodically poll the server in order to get updates via incremental synchronization. However push notifications delivered immediately when the new messages appear are much more convenient. To start receiving push notifications the client application should subscribe for the required events; in this case, for the new messages.

The RingCentral API supports receiving push notifications for its clients of any type, including but not limited to mobile applications (smartphones and tablets running Android/iOS), desktop applications (for example, softphone for Windows/Mac), server-side applications hosted in a cloud, HTML5 applications, etc.

The RingCentral API supporst two types of push notifications:

- Pub/Sub via PubNub: the client creates and maintains an open connection to receive new events. This is useful for client apps such as mobile apps and client-only web apps.

- Webhooks: RingCentral will post events to a URL. Because your service needs to host and Internet accessible URL, this approach is useful for server apps. A benefit here is that there is no need to maintain a connection as RingCentral will connect to your URL as events you subscribe to appear.

## Typical Subscription Flow

The typical subscription flow for both PubNub and Webhooks is as follows:

- A client application subscribes to the required events through the RingCentral API. In response the server provides all necessary information for the application to connect to the transport facilities that deliver the notifications: channel address; if required - credentials to access the channel, and notification payload encryption keys.

- The server starts to push events to the dedicated channel after the subscription is created. For PubNub, the delivery mechanism queues a certain amount of notifications, awaiting a client to get them.

- The client can unsubscribe explicitly at any time through the API. In this case the server immediately stops sending push notifications for this client.

- Each subscription has an expiration time and needs to be renewed explicitly by the client through the API call. If subscription is expired, the server silently stops sending push notifications for this client. The server may change any information it has to provide to client upon subscription renewal. Any changes are provided in the renewal response.

