# Posting a Card via the API

A card in Glip provides an efficient way of posting structured content into a chat. These are often used by developers when integrating with third-parties in order to create a Glip message that corresponds to an external event.

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

!!! tip "You can also post via a Glip Webhook URL"
    [Glip Webhook URLs](../webhooks/) provide an alternative conduit by which messages can be posted to a team. Glip Webhook URLs can be input into a third-party service provider to allow them to post on your behalf.

!!! note "What to be aware of when using message attachments"
    * All fields except `text` have a character limit of 300 bytes.
    * The cummulative size limit for all attachments is 1.5M bytes. 
    * "Glipdown," a RingCentral flavor of Markdown, provides some text formatting options (bold, italics, links, etc.)

### Posting an image via a card

One can use a card to post an image to a chat as well. This method allows you to associate additional text and metadata with an image you are posting. The following is an example message containing a single image. 

```json
{
  "attachments": [
    {
      "type": "Card",
      "fallback": "Attachment fallback text",
      "color": "#00ff2a",
      "intro": "Attachment intro appears before the attachment block",
      "text": "This would be a good place for a caption",
      "imageUri": "https://www.animalleague.org/wp-content/uploads/2019/07/cats_playing.jpg"
    }
  ]
}
```

Posting the contents above will result in a message that appears as follows:

<img src="../simple-image-card-message.png" class="img-fluid">

### Posting Multiple Cards at Once

The following is an example set of cards created by a single request containing three attachments. Each attachment results in its own card, and contains multiple fields. This example shows message attachments created through the [RingCentral Glip Salesforce integration](https://zapier.com/apps/glip/integrations/salesforce).

<img src="../../../img/glip_post_attachment_salesforce.png" class="img-fluid" style="max-width: 350px">

## Composing a Card

The following is a breakdown of the various properties of a Glip attachment of type "Card."

### Attachments

| Property | Description |
|-|-|
| `fallback` | A string of default text that will be rendered in the case that the client does not support Interactive Messages (Currently there are no Glip Clients that do not support this.) |
| `intro` | Intro text that appears above the card. |
| `color` | A Hex color code that determines the color of the side border of the Interactive Message. |
| `pretext` | A string that will display directly above the Message. |
| `author` | A set of properties that will render an author section at the top of the message. | 
| `title` | The actual title string. |
| `title_link` | Used to linkify the title. |
| `text` | A large string field (up to 1000 chars) to be displayed as the body of a message (utilizing "Glipdown," see below)
| `fields` | An array of objects that will render indvidual subsections within a message. | 
| `image_url` | A string url used to display a single image at the bottom of a message. We currently support GIF, JPEG and PNG. Glip only support "HTTPS" Urls. If the URL is a http url we show a placeholder. |
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


