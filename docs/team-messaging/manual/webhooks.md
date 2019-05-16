# Working with Glip Webhooks

Glip provides developers with a mechanism to make it easier to post messages to a given team. Glip webhooks, also referred to as "Inbound Glip Webhooks," operate slightly differently from RingCentral Platform webhooks, notifications and subscriptions. Where as platform webhooks offer a way for RingCentral to notify your system of a RingCentral event, Glip webhooks make it easier for developers to post messages and notifications into Glip.

## Creating a Glip Webhook

To create a Glip webhook, a developer specifies a group or team ID into which a Glip post will be created when a message is posted to the webhook URL that is returned. Let's look at a sample request and response for how a webhook URL is generated.

```http tab="Request"
POST https://platform.ringcentral.com/restapi/v1.0/glip/groups/6090227714/webhooks
```

```json tab="Response" hl_lines="9"
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

A URL is provisioned for each webhook (as shown above in the sample response) which is bound to the Glip Team or Group that was used when the webhook was created. When a developer posts to that URL, Glip will create a post within the corresponding group or team.

## Posting Messages via a Glip Webhook

With a webhook URL in-hand after creating one as shown above, developers can post different types of messages into a team. Developers can post:

* Cards
* Calendar Events
* Notes

Cards are the most common form of post as they provide a more practical way of transmitting lots of information to a reader. 

!!! warning "REST API <> Inbound Glip Webhooks"
    Posting a "card" to a webhook URL as described below utilizes **almost** the same message structure as discussed in [Message Attachments](../attachments). But be advised, they are not identical. 

### Example Glip Webhook

The following is an example message, transmitted in the POST body, to a Glip webhook URL.

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

<img src="../../../img/glip_post_attachment_demo.png" class="img-fluid">


