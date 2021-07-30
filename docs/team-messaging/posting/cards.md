# Cards and message attachments

!!! tip "Adaptive Cards"
    While RingCentral continues to support our proprietary format, we encourage developers to adopt the more robust and modern [Adaptive Cards framework](../../adaptive-cards/) for composing cards and messages.

Messages can have associated with them one or more attachments. One format an attachment can take is a card, which is a message designed to convey structured data in compressed manner. RingCentral supports a number of different card formats:

1. **Adaptive cards.** The Adaptive Cards format is [an open standard](https://adaptivecards.io) and robust way of displaying richly-formatted information. 

2. **Legacy Glip format**. A proprietary format created by RingCentral existing in two different variants, labeled "v1" and "v2" below. 

## Supported attachment schemas

### Adaptive Cards

Adaptive Cards are discussed in more detail in our [Adaptive Cards documentation](../../adaptive-cards/).

### Legacy card schemas

!!! warning "Our legacy card formats are deprecated."

!!! note "What to be aware of when using message attachments"
    * All fields except `text` have a character limit of 300 bytes.
    * The cummulative size limit for all attachments is 1.5M bytes. 
    * "Mini-markdown," a RingCentral flavor of Markdown, provides some text formatting options (bold, italics, links, etc.)

=== "Version 2"

    Older RingCentral apps may still be using our legacy card schema. The version 2 schema should be used by the following apps:

    * Apps posting directly to the REST API

    * Apps posting messages via an incoming webhook of the following format (note the `v2` located in the URL):

         `https://hooks.glip.com/webhooks/v2/abcdefg...`

    | Property | Description |
    |-|-|
    | `fallback` | A string of default text that will be rendered in the rarest case in which the client does not support Interactive Messages. |
    | `intro` | Intro text that appears above the card. |
    | `color` | A Hex color code that determines the color of the side border of the Interactive Message. |
    | `pretext` | A string that will display directly above the Message. |
    | `author` | A set of properties that will render an author section at the top of the message. | 
    | `title` | The actual title string. |
    | `title_link` | Used to linkify the title. |
    | `text` | A large string field (up to 1000 chars) to be displayed as the body of a message (utilizing "mini-Markdown," see below)
    | `fields` | An array of objects that will render indvidual subsections within a message. | 
    | `image_url` | A string url used to display a single image at the bottom of a message. We currently support GIF, JPEG and PNG. RingCentral only support "HTTPS" Urls. If the URL is a http url we show a placeholder. |
    | `thumb_url` | A string url used to display a thumbnail to the right of a message (82x82). |
    | `footer` | A set of properties that will render a footer under the message. |

    ##### Authors

    | Property | Description |
    |-|-|
    | `author_name` | The actual author name string. |
    | `author_link` | Used to link the authors name. Will only work when author_name is present. |
    | `author_icon` | A url to an image up to 82x82 px that will display to the left of the author's name. Will only work when author_name is present. |

    ##### Fields

    | Property | Description |
    |-|-|
    | `title` | A string that will display as the title for an individual field. |
    | `value` | A string that will display under the field title (Markdown). |
    | `style` | An enumerated string (either `Short` or `Long`) to indicate the width of the message. Defaults to `Long`. |

    ##### Footers

    | Property | Description |
    |-|-|
    | `footer` | A string used to be displayed as the body of the footer. |
    | `footer_icon` | A URL used to display a 32x32px icon to the left of the footer. |
    | `ts` | A Unix timestamp to be formatted and displayed to the right of the footer. |

=== "Version 1"

    Older RingCentral apps may still be using our legacy card schema. The version 1 schema should be used by the following apps:

    * Apps posting messages via an incoming webhook of the following format:

         `https://hooks.glip.com/webhooks/abcdefg...`

    | Property | Type | Required? | Description |
    |-|-|-|-|
    | `author_name` | string | No | Small text used to display the author's name. |
    | `author_link` | string | No | A valid URL that will hyperlink the author_name text mentioned above. Will only work if author_name is present. |
    | `author_icon` | string | No | A valid URL that displays a small 16x16px image to the left of the author_name text. Will only work if author_name is present. |
    | `color` | string | No | A Hex color code that determines the color of the side border of the Interactive Message. |
    | `image_url` | string | No | A string url used to display a single image at the bottom of a message. We currently support GIF, JPEG and PNG. RingCentral only support "HTTPS" Urls. If the URL is a http url we show a placeholder. |
    | `fallback` | string | Yes | A string of default text that will be rendered in the rarest case in which the client does not support Interactive Messages. |
    | `fields` | Array | No | An array of objects that will render indvidual subsections within a message. (see Fields below) | 
    | `footer` | string | No | Add some brief text to help contextualize and identify an attachment. Limited to 300 characters. |
    | `footer_icon` | string | No | To render a small icon beside your footer text, provide a publicly accessible URL string in the footer_icon field. You must also provide a footer for the field to be recognized. (16px x16px). |
    | `pretext` | string | No | A string that will display directly above the Message. |
    | `text` | string | Yes | A large string field (up to 1000 chars) to be displayed as the body of a message (utilizing "mini-Markdown," see below)
    | `thumb_url` | string | No | A string url used to display a thumbnail to the right of a message (82x82). |
    | `title` | string | Yes | The title is displayed as larger, bold text near the top of a message attachment. |
    | `title_link` | string | No | Used to linkify the title. |

    ##### Fields

    | Property | Type | Description |
    |-|-|-|
    | `title` | string | Shown as a bold heading above the value text. It cannot contain markup and will be escaped for you. |
    | `value` | string | The text value of the field. It may contain standard markup and must be escaped as normal. May be multi-line. |
    | `short` | boolean | An optional flag indicating whether the value is short enough to be displayed side-by-side with other values. |

#### Mini-Markdown: a RingCentral flavor of Markdown

Our legacy card formats support a simplified version of Markdown to assist in the formatting of text within a message. The following syntaxes are supported for post attachments in addition to post bodies.

<table class="table">
<thead>
<tr><th scope="col">Mini-markdown</th><th scope="col">Resulting Text</th></tr>
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

