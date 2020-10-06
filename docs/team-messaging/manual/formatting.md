# Using a Glip Webhook to post a message to a chat

??? warning "This documentation is for version 1 Glip Webhook URLs. Which version am I using?"
    Depending upon when a Glip Webhook URL was created, you may notice a slight variation in their format. These two variations represent two different versions of the the Glip Webhook URL system.
    
    | Version | URI Scheme |
    |-|-|
    | 1 | `https://hooks.glip.com/webhook/{ webhook id }` | 
    | 2 | `https://hooks.glip.com/webhook/v2/{ webhook id }` | 

    Read the documentation for [Glip Webhook URL version 2](../webhook-posting/).

    !!! tip "Migrating between Glip Webhook URL versions"
        One can easily begin using version 2 Glip Webhook URLs just by inserting `v2` into the URI path between `/webhook/` and the webhook id. There is no need to create a new Glip Webhook just to migrate from one version to another.

Glip Webhook URLs can be used to post messages to an associated team from an external service provider. This article will guide you through the basic process of composing a message that will be posted to a team. 

## How to post a message via a Glip Webhook URL

To post a Glip message via a Glip Webhook URL, one composes a [Glip message in JSON format](../posting-cards/) and then performs an `HTTP POST` to the Glip Webhook URL using the Glip JSON message as a payload. Using this methodology, one can post visually rich and information dense messages to a chat.

When posting a message, be sure to specify a Content-Type of `application/json` in your request.

Cards are the most common form of post as they provide a more practical way of transmitting lots of information to a reader in a screen efficient way.

### How to compose a Glip message and card in JSON

The following is a very simple Glip message formatted in JSON that can be used in an external tool to post messages to a Glip Webhook URL.

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
		    "value": "Giant explosion",
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

The following is an example set of cards created by a single request containing three attachments. Each attachment results in its own card, and contains multiple fields. This example shows message attachments created through the [RingCentral Glip Salesforce integration](https://zapier.com/apps/glip/integrations/salesforce).

<img src="../../../img/glip_post_attachment_salesforce.png" class="img-fluid" style="max-width: 450px">

## Message Properties

### Attachments

| Property | Description |
|-|-|
| `fallback` | A string of default text that will be rendered in the case that the client does not support Interactive Messages (Currently there are no Glip Clients that do not support this.) |
| `color` | A Hex color code that determines the color of the side border of the Interactive Message. |
| `pretext` | A string that will display directly above the Message. |
| `title` | The actual title string. |
| `title_link` | Used to linkify the title. |
| `text` | A large string field (up to 1000 chars) to be displayed as the body of a message (utilizing "Glipdown," see below)
| `fields` | An array of objects that will render indvidual subsections within a message. | 
| `image_url` | A string url used to display a single image at the bottom of a message. We currently support GIF, JPEG and PNG. Glip only support "HTTPS" Urls. If the URL is a http url we show a placeholder. |
| `thumb_url` | A string url used to display a thumbnail to the right of a message (82x82). |
| `footer` | A set of properties that will render a footer under the message. |

### Fields

| Property | Description |
|-|-|
| `title` | A string that will display as the title for an individual field. |
| `value` | A string that will display under the field title (Markdown). |
| `short` | A boolean value to indicate the width of the field. If "true," field will be narrow, allowing two field to fit in a single row. |

## Glipdown: a Glip flavor of Markdown

Glip supports a simplified version of Markdown to assist in the formatting of text within a message. The following syntaxes are supported for post attachments in addition to post bodies.

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

