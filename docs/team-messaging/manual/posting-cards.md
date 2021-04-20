# Posting a Card via the API

A RingCentral Card provides an efficient way of posting structured content into any RingCentral chat. Cards are often used by developers when integrating with third-parties in order to create a message that corresponds to an external event.

Cards are added to a simple text message through the use of an "attachment." Here is an example of a message with no text and a simple card:

```json
{
  "attachments": [
    {
      "type": "Card",
      "fallback": "Attachment fallback text",
      "color": "#00ff2a",
      "intro": "Attachment intro appears before the attachment block",
      "text": "Attachment text",
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
        }
      ]
    }
  ]
}
```

Posting the contents above will result in a message that appears as follows:

<img src="../simple-card-message.png" class="img-fluid">

!!! tip "You can also post via an Incoming Webhook"
    [Incoming Webhooks](../webhook-creation/) provide an alternative conduit by which messages can be posted to a team. An Incoming Webhook's URL can be input into a third-party service provider to allow them to post event messages into a team on your behalf.

!!! note "What to be aware of when using message attachments"
    * All fields except `text` have a character limit of 300 bytes.
    * The cummulative size limit for all attachments is 1.5M bytes. 
    * "Glipdown," a RingCentral flavor of Markdown, provides some text formatting options (bold, italics, links, etc.)

### Posting Multiple Cards at Once

The following is an example set of cards created by a single request containing three attachments. Each attachment results in its own card, and contains multiple fields. This example shows message attachments created through the [RingCentral Salesforce integration](https://zapier.com/apps/glip/integrations/salesforce).

<img src="../../../img/glip_post_attachment_salesforce.png" class="img-fluid" style="max-width: 350px">

## Composing a Card

The following is a breakdown of the various properties of an attachment of type "Card."

### Attachments

| Property | Description |
|-|-|
| `fallback` | A string of default text that will be rendered in the rarest case in which the client does not support Interactive Messages. |
| `intro` | Intro text that appears above the card. |
| `color` | A Hex color code that determines the color of the side border of the Interactive Message. |
| `pretext` | A string that will display directly above the Message. |
| `author` | A set of properties that will render an author section at the top of the message. | 
| `title` | The actual title string. |
| `title_link` | Used to linkify the title. |
| `text` | A large string field (up to 1000 chars) to be displayed as the body of a message (utilizing "Glipdown," see below)
| `fields` | An array of objects that will render indvidual subsections within a message. | 
| `image_url` | A string url used to display a single image at the bottom of a message. We currently support GIF, JPEG and PNG. RingCentral only support "HTTPS" Urls. If the URL is a http url we show a placeholder. |
| `thumb_url` | A string url used to display a thumbnail to the right of a message (82x82). |
| `footer` | A set of properties that will render a footer under the message. |

### Authors

| Property | Description |
|-|-|
| `author_name` | The actual author name string. |
| `author_link` | Used to link the authors name. Will only work when author_name is present. |
| `author_icon` | A url to an image up to 82x82 px that will display to the left of the author's name. Will only work when author_name is present. |

### Fields

| Property | Description |
|-|-|
| `title` | A string that will display as the title for an individual field. |
| `value` | A string that will display under the field title (Markdown). |
| `style` | An enumerated string (either `Short` or `Long`) to indicate the width of the message. Defaults to `Long`. |

### Footers

| Property | Description |
|-|-|
| `footer` | A string used to be displayed as the body of the footer. |
| `footer_icon` | A URL used to display a 32x32px icon to the left of the footer. |
| `ts` | A Unix timestamp to be formatted and displayed to the right of the footer. |


