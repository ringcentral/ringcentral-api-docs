# Recovering a WebSocket session

The Web Socket protocol allows for clients to initate session recovery in the event that connection is lost, or something goes wrong. Provided that the client can detect and initiate the recover process within 180 seconds, the session will be completely recovered - preserving existing event subscriptions and sending any missed events in the short time the connection was lost. To recover the disconnected WebSocket session please follow the steps.

## Obtain a new WebSocket access token

To recover a session, the first thing a client must do is request a new WebSocket token, just as was done when the [connection was first established](../subscribing/). As a reminder, clients request a WebSocket access token by making the following request:

```http
POST /restapi/oauth/wstoken HTTP/1.1
Authorization: Bearer <access token>
```

## Reconnect to the WebSocket server

Reconnecting to the WebSocket server is done a similar way as when the connection was first established. However, an additional query string parameter should be appended to the WebSocket server URL. The parameter to append is the WebSocket Connection token transmitted to your app when the connection was initially made. The token should be appended to the server URL along with the WebSocket access token, as follows:

```
wss://servername.ringcentral.com/ws?access_token=<WS access token>&wsc=<WSC token>
```

!!! info "The client application must prevent any interaction via the initiated WebSocket connection until the 'ConnectionDetails' message is received."

## Processing recovery results

As a result of your session recovery attempt the client will receive another `ConnectionDetails` message, which will also include a `recoveryState` field disclosing whether or not the recovery was a success. 

```json
{! code-samples/websockets/session-recovery.json !}
```

### Recovery success

If the `recoveryState` field value is set to `Successful` (see the example above) then the client can continue working as it did before it was disconnected. If successful, the WebSocket session is restored and all current subscriptions remain active. Upon successful recovery, the client will receive all the messages it missed while it was unavailable -- assuming those missed events are below the recovery buffer size. If the number of messages received while being disconnected exceeds the supported limit of 100 messages (see `recoveryBufferSize` field value), then the client will receive only the most recent events. 

### Recovery failure

If the `recoveryState` field is `Failed` then:

* WebSocket session context is lost;
* notifications that could be received while the client was disconnected are lost;
* all subscriptions in the new session must be re-created.

If session recovery fails then the client needs to subscribe again for all the required events, however the WebSocket connection remains the same, there is no need to open a new one.


