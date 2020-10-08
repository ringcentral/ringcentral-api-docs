# Posting messages via a Glip Webhook URL

There are two primary ways one can post a message to a team. Either developers can post directly via the REST API, or they can post via Glip Webhook URL.

## Why use a Glip Webhook URL to post a message?

A Glip Webhook URL is a mechanism designed specifically for enabling external service providers to post messages into a specific team without having to also worry about authentication. For example, suppose you want to convert a webhook notification emitted by the issue tracking system Jira into a Glip message, and have that Glip message delivered to a specific team? To do this, one would:

1. Generate a Glip Webhook URL (via RingCentral App, or via the RingCentral API)
2. Copy and paste the Glip Webhook URL into Jira where one configures webhook notifications

Then, when a webhook is triggered in Jira, Jira will post a JSON event payload to the configured Glip Webhook URL. Upon receiving the webhook, Glip will convert the event into a message and post it to the Glip Webhook's corresponding team. 

## How to create a Glip Webhook URL

### Using RingCentral App

There are two ways to create a Glip Webhook URL. The first and most common method involves using the RingCentral App, navigating to the team into which you wish to receive messages, and clicking "Add Apps" from the conversation menu.

<img src="../add-apps.png" class="img-fluid">

On the subsequent screen, you will be prompted to select the app you want to install. Look for the app entitled "Webhook," hover over it, and click "Add." A modal dialog will appear and in it you will see a URL. Copy and paste it into your target system.

### Using the RingCentral API

The other way to create a Glip Webhook URL is via the API. To create a webhook URL in this fashion, a developer uses the API to create a webhook associated with a specific chat ID. Let's look at a sample request and response for how a webhook URL is generated.

=== "Request"

	```http
	POST https://platform.ringcentral.com/restapi/v1.0/glip/groups/6090227714/webhooks
	```

=== "Response"

	```json 
	{
	    "id": "3053f6cf-b6de-418c-a6cd-2eb222cdab4e",
	    "creatorId": "61307231006",
	    "groupIds": [
		"6090227714"
	    ],
	    "creationTime": "2018-12-11T16:29:02.185Z",
	    "lastModifiedTime": "2018-12-11T16:29:02.185Z",
	    "uri": "https://hooks.glip.com/webhook/v2/3053f6cf-b6de-418c-a6cd-2eb222cdab4e",
	    "status": "Active"
	}
	```

## How to post messages via a Glip Webhook URL

With a webhook URL in-hand after creating one as shown above, developers can post different types of messages into a team. Developers can post:

* Cards
* Calendar Events
* Notes

Cards are the most common form of post as they provide a more practical way of transmitting lots of information to a reader in a screen efficient way.

### Version 1 vs Version 2 Glip Webhook URLs

Depending upon when a Glip Webhook URL was created, you may notice a slight variation in their format. These two variations represent two different versions of the the Glip Webhook URL system.

| Version | URI Scheme |
|-|-|
| 1 | `https://hooks.glip.com/webhook/{ webhook id }` | 
| 2 | `https://hooks.glip.com/webhook/v2/{ webhook id }` | 

Version 1 Glip Webhook URLs are more limited than their version 2 counterparts in the following ways:

* TODO
* TODO

!!! tip "Migrating between Glip Webhook URL versions"
    One can easily begin using version 2 Glip Webhook URLs just by inserting `v2` into the URI path between `/webhook/` and the webhook id. There is no need to create a new Glip Webhook just to migrate from one version to another.

### Using Glip Webhook URLs

#### Version 1

The following is an example message, transmitted in the POST body, posted to a version 1 Glip Webhook URL endpoint.

```json
{
  "icon": "https://example.com/post_icon.png",
  "title": "**Title of the post**",
  "body": "Body of the post",
  "attachments": [
    {
      "type": "Card",
      "color": "#00ff2a",
      "pretext": "Attachment pretext appears before the attachment block",
      "author_name": "Author Name",
      "author_link": "https://example.com/author_link",
      "author_icon": "https://example.com/author_icon.png",
      "title": "Attachment Title",
      "title_link": "https://example.com/title_link",
      "fields": [
        {
          "title": "Field 1",
          "value": "A short field",
          "short": true
        },
        {
          "title": "Field 2",
          "value": "[A linked short field](https://example.com)",
          "short": true
        },
        {
          "title": "Field 3",
          "value": "A long, full-width field with *formatting* and [a link](https://example.com)"
        }
      ],
      "text": "Attachment text",
      "image_url": "https://example.com/congrats.gif",
      "footer": "Attachment footer and timestamp",
      "footer_icon": "https://example.com/footer_icon.png",
      "ts": 1503723350
    }
  ]
}
```

It will result in a message and card that appears a shown below:

<img src="../../../img/glip_post_attachment_demo.png" class="img-fluid" style="max-width: 400px">

#### Version 2

```json
{
  "text": "Body of the post",
  "attachments": [
    {
      "type": "Card",
      "fallback": "Attachment fallback text",
      "color": "#00ff2a",
      "intro": "Attachment intro appears before the attachment block",
      "author": {
          "name": "Author Name",
          "uri": "https://example.com/author_link",
          "iconUri": "https://example.com/author_icon.png"
      },
      "title": "Attachment Title",
      "text": "Attachment text",
      "imageUri": "https://example.com/congrats.gif",
      "thumbnailUri": "https://example.com/thumbnail_icon.png",
      "fields": [
        {
          "title": "Field 1",
          "value": "A short field",
          "style": "Short"
        },
        {
          "title": "Field 2",
          "value": "[A linked short field](https://example.com)",
          "style": "Short"
        },
        {
          "title": "Field 3",
          "value": "A long, full-width field with *formatting* and [a link](https://example.com)",
          "style": "Long"
        }
      ],
      "footnote": {
        "text": "Attachment footer and timestamp",
        "iconUri": "https://example.com/footer_icon.png",
        "time": "2018-01-05T18:52:35.993311508-08:00"
      }
    }
  ]
}
```
