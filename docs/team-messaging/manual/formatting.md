# Using an Incoming Webhook to post a message to a chat

??? warning "This documentation is for Incoming Webhooks version 1. Which version are you using?"
    Depending upon when an Incoming Webhook was created, you may notice a slight variation in their URL format, which you can use to identify what version of Incoming Webhooks you are using:
    
    | Version | URI Scheme |
    |-|-|
    | 1 | `https://hooks.glip.com/webhook/{ webhook id }` | 
    | 2 | `https://hooks.glip.com/webhook/v2/{ webhook id }` | 

    Read the documentation for [Incoming Webhooks version 2](../webhook-posting/).

    !!! tip "Migrating between Incoming Webhook versions"
        One can easily switch between using the two version by manually editing the Incoming Webhook's URL accordingly.

Incoming Webhooks, historically known as "Glip Webhooks," can be used to post messages to an associated chat from an external service provider. This article will guide you through the basic process of composing a message that will be posted to a chat. 

## How to post a message via an Incoming Webhook

To post a message via an Incoming Webhook, one composes [a message formatted in JSON](../posting-cards/) and then posts that message to the Incoming Webhook's URL. Using this methodology, one can post visually-rich and information dense messages to a chat.

When posting a message, be sure to specify a Content-Type of `application/json` in your request.

### How to compose a card in JSON

Cards are the most common type of post used to signal that an event has occurred. They are also a more practical way of transmitting information-rich content to a reader in a screen efficient way.

The following is a very simple JSON formatted message that can be used in an external tool to post messages to an Incoming Webhook.

```json
{
    "attachments": [
	{
	    "type": "Card",
	    "fallback": "Something bad happened",
	    "color": "#00ff2a",
	    "title": "I felt something...",
	    "text": "...as if millions of voices suddenly cried out in terror and were suddenly silenced.",
	    "fields": [
		{
		    "title": "Where",
		    "value": "Alderaan",
		    "short": true
		},
		{
		    "title": "What",
		    "value": "Death Star",
		    "short": true
		}
	    ]
	}
    ]
}
```

Posting the above to the REST API will result in a message and card that appears as follows:

<img src="../webhook-posting-v1.png" class="img-fluid">

!!! note "What to be aware of when using message attachments"
    * All fields except `text` have a character limit of 300 bytes.
    * The cummulative size limit for all attachments is 1.5M bytes. 
    * "Glipdown," a RingCentral flavor of Markdown, provides some text formatting options (bold, italics, links, etc.)

### Posting Multiple Cards at Once

The following is an example set of cards created by a single request containing three attachments. Each attachment results in its own card, and contains multiple fields. This example shows message attachments created through the [RingCentral Salesforce integration](https://zapier.com/apps/glip/integrations/salesforce).

<img src="../../../img/glip_post_attachment_salesforce.png" class="img-fluid" style="max-width: 450px">

## Message Properties

### Attachments

| Property | Description |
|-|-|
| `fallback` | A string of default text that will be rendered in the rarest case in which the client does not support Interactive Messages. |
| `color` | A Hex color code that determines the color of the side border of the Interactive Message. |
| `pretext` | A string that will display directly above the Message. |
| `title` | The actual title string. |
| `title_link` | Used to linkify the title. |
| `text` | A large string field (up to 1000 chars) to be displayed as the body of a message (utilizing "Glipdown," see below)
| `fields` | An array of objects that will render indvidual subsections within a message. | 
| `image_url` | A string url used to display a single image at the bottom of a message. We currently support GIF, JPEG and PNG. RingCentral only support "HTTPS" Urls. If the URL is a http url we show a placeholder. |
| `thumb_url` | A string url used to display a thumbnail to the right of a message (82x82). |
| `footer` | A set of properties that will render a footer under the message. |

### Fields

| Property | Description |
|-|-|
| `title` | A string that will display as the title for an individual field. |
| `value` | A string that will display under the field title (Markdown). |
| `short` | A boolean value to indicate the width of the field. If "true," field will be narrow, allowing two field to fit in a single row. |

## Glipdown: a RingCentral flavor of Markdown

RingCentral supports a simplified version of Markdown to assist in the formatting of text within a message. The following syntaxes are supported for post attachments in addition to post bodies.

<table class="table">
<thead>
<tr><th scope="col">Glip/Markdown</th><th scope="col">Resulting Text</th></tr>
</thead>
<tbody>
<tr><td>*italics*</td><td><i>italics</i></td></tr>
<tr><td>**bold**</td><td><b>bold</b></td></tr>
<tr><td>_underline_</td><td><u>underline</u></td></tr>
<tr><td>[a link](http://example.com)</td><td><a href="http://example.com">a link</a></td></tr>
<tr><td>&gt; quote</td><td><blockquote>quote</blockquote></td></tr>
<tr><td>* bullet</td><td><ul><li>bullet</li></ul></td></tr>
</tbody>
</table>

