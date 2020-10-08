# Using a Glip Webhook to post a message to a chat

??? warning "This documentation is for version 2 Glip Webhook URLs. Which version am I using?"
    Depending upon when a Glip Webhook URL was created, you may notice a slight variation in their format. These two variations represent two different versions of the the Glip Webhook URL system.
    
    | Version | URI Scheme |
    |-|-|
    | 1 | `https://hooks.glip.com/webhook/{ webhook id }` | 
    | 2 | `https://hooks.glip.com/webhook/v2/{ webhook id }` | 

    Read the documentation for [Glip Webhook URL version 1](../formatting/).

    !!! tip "Migrating between Glip Webhook URL versions"
        One can easily begin using version 2 Glip Webhook URLs just by inserting `v2` into the URI path between `/webhook/` and the webhook id. There is no need to create a new Glip Webhook just to migrate from one version to another.

## What is a "Glip Webhook URL?"

A Glip Webhook URL is a mechanism designed for enabling external service providers to post messages into a specific chat. Using a Glip Webhook URL for example, one can direct a service like Asana, Jira, or Pagerduty to post an event/webhook emitted by that service to a Glip Webhook URL. Then for [supported service providers](../webhook-service-providers/), Glip will convert the event payload it receives into a Glip message, and post it to the corresponding team. 

## How to post a message via a Glip Webhook URL

To post a Glip message via a Glip Webhook URL, one composes a [Glip message in JSON format](../posting-cards/) and then performs an `HTTP POST` to the Glip Webhook URL using the Glip JSON message as a payload. Using this methodology, one can post visually rich and information dense messages to a chat.

When posting a message, be sure to specify a Content-Type of `application/json` in your request.

Cards are the most common form of post as they provide a more practical way of transmitting lots of information to a reader in a screen efficient way.

### How to compose a Glip message and card in JSON

A Glip message has a very simple structure. It contains a message in the `text` field, and a set of attachmemts. An attachment can be an image, a file, an event, or a card. The following example shows a sample message with a single Card attachment.

```json
{
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

Posting the above JSON to a Glip Webhook URL will result in a message and card that appears as follows:

<img src="../webhook-posting.png" class="img-fluid" style="max-width: 600px">

## See Also

* [Composing and posting Cards](../posting-cards/)