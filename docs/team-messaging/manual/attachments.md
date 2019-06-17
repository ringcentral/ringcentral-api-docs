# Creating Rich Posts with Glip Message Attachments

Glip Message Attachments allow developers to attach rich content to posts with formatting and color indicators to more easily convey a large amount of information. This is available with both [Inbound Webhooks](../webhooks) and the REST API. Using Glip Message Attachments one can:

* Add up to 20 attachments per post, each rendered as its own section
* Add an author, title, pretext, text to each attachment
* Select a color for each attachment to indicate importance or subject
* Render short metadata using the fields property
* Render photos and images

!!! note "What to be aware of when using message attachments"
    * All fields except `text` have a character limit of 300 bytes.
    * The cummulative size limit for all attachments is 1.5M bytes. 
    * "Glipdown," a RingCentral flavor of Markdown, provides some text formatting options (bold, italics, links, etc.)

## Posting Messages via the REST API

What follows is an example message that can be posted to the REST API.

!!! warning "REST API <> Inbound Glip Webhooks"
    Posting a "card" via the REST API as described below utilizes **almost** the same message structure as discussed in [Working with Glip Webhooks](../webhooks). But be advised, they are not identical. 

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

Posting the above to the REST API will result in a message and card that appears as follows:

<img src="../../../img/glip_post_attachment_demo.png" class="img-fluid">

### Posting Multiple Cards at Once

The following is an example set of cards created by a single request containing three attachments. Each attachment results in its own card, and contains multiple fields. This example shows message attachments created through the [RingCentral Glip Salesforce integration](https://zapier.com/apps/glip/integrations/salesforce).

<img src="../../../img/glip_post_attachment_salesforce.png" class="img-fluid">

## Message Properties

### Attachments

| Property | Description |
|-|-|
| **fallback** | A string of default text that will be rendered in the case that the client does not support Interactive Messages (Currently there are no Glip Clients that do not support this.) |
| **color** | A Hex color code that determines the color of the side border of the Interactive Message. |
| **pretext** | A string that will display directly above the Message. |
| **author** | A set of properties that will render an author section at the top of the message. | 
| **title** | The actual title string. |
| **title_link** | Used to linkify the title. |
| **text** | A large string field (up to 1000 chars) to be displayed as the body of a message (utilizing "Glipdown," see below)
| **fields** | An array of objects that will render indvidual subsections within a message. | 
| **image_url** | A string url used to display a single image at the bottom of a message. We currently support GIF, JPEG and PNG. Glip only support "HTTPS" Urls. If the URL is a http url we show a placeholder. |
| **thumb_url** | A string url used to display a thumbnail to the right of a message (82x82). |
| **footer** | A set of properties that will render a footer under the message. |

### Authors

| Property | Description |
|-|-|
| **author_name** | The actual author name string. |
| **author_link** | Used to link the authors name. Will only work when author_name is present. |
| **author_icon** | A url to an image up to 82x82 px that will display to the left of the author's name. Will only work when author_name is present. |

### Fields

| Property | Description |
|-|-|
| **title** | A string that will display as the title for an individual field. |
| **value** | A string that will display under the field title (Markdown). |
| **style** | An enumerated string (either `Short` or `Long`) to indicate the width of the message. Defaults to `Long`. |

### Footers

| Property | Description |
|-|-|
| **footer** | A string used to be displayed as the body of the footer. |
| **footer_icon** | A URL used to display a 32x32px icon to the left of the footer. |
| **ts** | A Unix timestamp to be formatted and displayed to the right of the footer. |

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

