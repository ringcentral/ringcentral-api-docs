# Using an incoming webhook to post a message

An incoming webhook is a mechanism designed to make integrating with third-party services easier by enabling them to post messages into a specific chat safely and securely. Using an incoming webhook for example, one can direct a service like Zapier to post a message or card to a chat via an incoming webhook's URL. 

## How to post a message via an incoming webhook

To post a message via an incoming webhook, one composes a message in JSON and then transmits that message via an HTTP POST to the incoming webhook's URL. Using this methodology, one can post simple messages to a chat.

To post a message successfully, the Content-Type should be set to `application/json`.

Here is a simple HTTP POST showing how to post a simple "Hello World" message. 

```http
POST /webhook/v2/eyJhbGciOiJI.xxxxxx.zI1NiIsInR5cCI6IkpXVCJ9
Host: hooks.ringcentral.com
Content-Type: application/json

{
  "text": "Hello world"
}
```

## How to post a card via an incoming webhook

!!! tip "Posting cards: incoming webhooks versus REST API"
    When posting cards via an incoming webhooks the card's contents is transmitted via an attachment. However, this is only supported when posting via an incoming webhook. 
	If a card is transmitted as an attachment when posting via the REST API, you will get the following error message: "Parameter [attachments[0].type] value is invalid.
	To [post a card via the REST API](../../posting/cards/), please use the endpoints devoted to that task."

[Cards](../attachments/) are the most common form of post for third-party integrations as they provide a more practical way of transmitting lots of information to a reader in a screen efficient way. Cards are posted in a manner similar to simple messages as shown above, except that the card's contents are transmitted via an attachment. 

The example below is a sligh modification to the example above. In it, we omit the message text, and transmit a single attachment. 

```http
POST /webhook/v2/eyJhbGciOiJI.xxxxxx.zI1NiIsInR5cCI6IkpXVCJ9
Host: hooks.ringcentral.com
Content-Type: application/json

{!> code-samples/team-messaging/adaptive-cards/simple-card.json !}
```

Posting the above JSON to an incoming webhook will result in a message that appears as follows:

<img src="../../incoming-webhooks/sample-adaptive-card.png" class="img-fluid" style="max-width: 600px">

