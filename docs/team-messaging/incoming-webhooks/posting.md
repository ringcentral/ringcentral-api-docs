# Using an Incoming Webhook to post a message to a chat

??? warning "This documentation is for Incoming Webhooks version 2. Which version are you using?"
    Depending upon when an Incoming Webhook was created, you may notice a slight variation in their URL format, which you can use to identify what version of Incoming Webhooks you are using:
    
    | Version | URI Scheme |
    |-|-|
    | 1 | `https://hooks.glip.com/webhook/{ webhook id }` | 
    | 2 | `https://hooks.glip.com/webhook/v2/{ webhook id }` | 

    Read the documentation for [Incoming Webhooks version 1](../formatting/).

    !!! tip "Migrating between Incoming Webhook versions"
        One can easily switch between using the two version by manually editing the Incoming Webhook's URL accordingly.

## What is an "Incoming Webhook?"

An Incoming Webhook is a mechanism designed to enable third-parties to post messages into a specific chat. Using an Incoming Webhook for example, one can direct a service like Asana, Jira, or Pagerduty to post an event/webhook emitted by that service to an Incoming Webhook's URL. Then for [supported service providers](../webhook-service-providers/), RingCentral will convert the event payload it receives into a message, and post it to the corresponding team. 

## How to post a message via an Incoming Webhook

To post a message via an Incoming Webhook, one composes a [JSON formatted message](../posting-cards/) and then posts that message to the Incoming Webhook's URL. Using this methodology, one can post visually rich and information dense messages to a chat.

To post a message successfully, the Content-Type should be set to `application/json`.

Cards are the most common form of post as they provide a more practical way of transmitting lots of information to a reader in a screen efficient way.

### How to compose a message and card in JSON

A message has a very simple structure. It contains a message in the `text` field, and a set of attachmemts. An attachment can be an image, a file, an event, or a card. The following example shows a sample message with a single Card attachment.

```json
{
  "activity": "Force Alerts",
  "iconUri": "https://example.com/force.png",
  "title": "1 force alert",
  "text": "Be mindful of the force",
  "attachments": [
    {
      "type": "Card",
      "fallback": "Something bad happened",
      "color": "#00ff2a",
      "intro": "There was a disturbance in the force.",
      "author": {
        "name": "Ben Kenobi",
        "uri": "https://en.wikipedia.org/wiki/Obi-Wan_Kenobi",
        "iconUri": "https://imgur.com/eaL6deH",
      },
      "title": "I felt something...",
      "body": "...as if millions of voices suddenly cried out in terror and were suddenly silenced.",
      "fields": [
        {
          "title": "Where",
          "value": "Alderaan",
          "style": "Short"
        },
        {
          "title": "What",
          "value": "Giant explosion",
          "style": "Short"
        },
      ]
    }
  ]
}
```

Posting the above JSON to an Incoming Webhook will result in a message that appears as follows:

<img src="../webhook-posting.png" class="img-fluid" style="max-width: 600px">

## See Also

* [Composing and posting Cards](../posting-cards/)
