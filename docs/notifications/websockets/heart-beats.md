# Keeping WebSocket connections alive

WebSocket connections are persistent, but could from time to time become relatively inactive. To prevent the server from assuming that the connection is no longer valid, and conversely for clients to check the health of a connection, both clients and servers can send messages over the WebSocket connection to make sure the connection is active and alive.

## How clients can check to see if a connection is active

A client is free to poll the WebSocket server to ensure it is still responding to request and still alive. A client does that by sending a heartbeat request over the WebSocket connection. A heartbeat request should be made only when:

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
