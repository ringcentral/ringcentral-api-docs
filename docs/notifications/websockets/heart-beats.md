# Keeping WebSocket connections alive

WebSocket connections are persistent, but could from time to time become relatively inactive. To prevent the server from assuming that the connection is no longer valid, and conversely for clients to check the health of a connection, both clients and servers can send messages over the WebSocket connection to make sure the connection is active and alive.

## Timeouts and error notifications

The following error messages will be transmitted from the server to an attached client when connections are terminated due to a timeout. 

| Error   | Message                  |
|---------|--------------------------|
| WSG-902 | Idle timeout expired     |
| WSG-903 | Absolute timeout expired |

### Idle timeouts

Idle timeouts occur when a client connection remains inactive for longer than thirty minutes. Prior to the server disconnecting from the client, the server will transmit an error message indicating the error condition. To rectify, [reconnect to the server](session-recovery.md). 

### Absolute timeouts

Once every twenty-four hours, servers will forcibly disconnect with clients regardless of their activity. This is called an "absolute timeout." To rectify, [reconnect to the server](session-recovery.md). 

## How to keep connections alive

There are many reasons that the connection with a Websocket Server could be disrupted. This could include inactivity, but could also be a networking issue, or an expired auth token, or other unanticipated reasons. Given the many possible reasons a connection could be disrupted, developers are responsible for monitoring WebSocket connectivity and recover lost connections accordingly. 

A client should periodically poll the WebSocket server to ensure it is still responding to requests and is still alive. A client does that by sending a heartbeat request over the WebSocket connection. A heartbeat request should be made only when:

* the client doesn't support sending WebSocket ping frames (most browser clients) and
* the client receives no messages from the server for a reasonable period of time (at least 30 seconds) 

A heart beat request should look like this:

```json
{! code-samples/websockets/heart-beat-request.json !}
```

And the response will look something like:

```json
{! code-samples/websockets/heart-beat-response.json !}
```

## How to properly respond to checks from the server to see if the client is still active

RingCentral WebSocket servers will periodically check a client's connection to the server by sending a "[ping frame](https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.2)" to the client. To show that the client is still active so that the connection will stay alive, clients must respond to a ping frame with a "[pong frame](https://datatracker.ietf.org/doc/html/rfc6455#section-5.5.3)" within 10 seconds. If no response is sent in the allotted time period, the server may close the connection with the client. 
