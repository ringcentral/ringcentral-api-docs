# Receiving event notifications via WebSockets

Once a [connection to the WebSocket server has been established](subscribing.md), RingCentral will begin transmitting `ServerNotification` payloads corresponding to individual events that you have subscribed to. Like all WebSocket events, a server notification exists in two parts of an array: the WebSocket meta data and the payload of the event. The event payload is identical to payloads received via a webhook subscription.

**Example Web Socket server notification**

```js
{! code-samples/websockets/websocket-notification.json !}
```

