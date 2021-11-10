# RingCentral's legacy attachment formats

Prior to [adaptive cards](../../adaptive-cards) RingCentral supported its own proprietary format for creating richly formatted cards. Overt time we developed two different schemas, creatively named "version 1" and "version 2." These formats are documented below.

!!! tip "Adaptive Cards"
    While RingCentral continues to support our proprietary format, we encourage developers to adopt the more robust and modern [Adaptive Cards framework](../../adaptive-cards/) for composing cards and messages.
	
!!! note "What to be aware of when using message attachments"
    * All fields except `text` have a character limit of 300 bytes.
    * The cummulative size limit for all attachments is 1.5M bytes. 
    * "Mini-markdown," a RingCentral flavor of Markdown, provides some text formatting options (bold, italics, links, etc.)

=== "Version 2"

    Older RingCentral apps may still be using our legacy card schema. The version 2 schema is only supported by incoming webhook URLs that include the 'v2' path element as show below:

    * `https://hooks.glip.com/webhooks/v2/abcdefg...`
    * `https://hooks.ringcentral.com/webhooks/v2/abcdefg...`
		 
    ### Example message and attachment
	
	```http
    POST /webhook/v2/eyJhbGciOiJI.xxxxxx.zI1NiIsInR5cCI6IkpXVCJ9
    Host: hooks.ringcentral.com
    Content-Type: application/json
	
    {!> code-samples/team-messaging/adaptive-cards/legacy-v2.json !}
	```
	
    ### Schema

    | Property | Type | Description |
    |-|-|-|
    | `fallback` | string | A string of default text that will be rendered in the rarest case in which the client does not support Interactive Messages. |
    | `intro` | string | Intro text that appears above the card. |
    | `color` | string | A Hex color code that determines the color of the side border of the Interactive Message. |
    | `pretext` | string | A string that will display directly above the Message. |
    | `author` | Author | A set of properties that will render an author section at the top of the message. | 
    | `title` | string | The actual title string. |
    | `title_link` | string | Used to linkify the title. |
    | `text` | string | A large string field (up to 1000 chars) to be displayed as the body of a message (utilizing "mini-Markdown," see below)
    | `fields` | array of Field | An array of objects that will render indvidual subsections within a message. | 
    | `image_url` | string | A string url used to display a single image at the bottom of a message. We currently support GIF, JPEG and PNG. RingCentral only support "HTTPS" Urls. If the URL is a http url we show a placeholder. |
    | `thumb_url` | string |  A string url used to display a thumbnail to the right of a message (82x82). |
    | `footer` | Footer | A set of properties that will render a footer under the message. |

    ##### Authors

    | Property | Type | Description |
    |-|-|-|
    | `author_name` | string | The actual author name string. |
    | `author_link` | string | Used to link the authors name. Will only work when author_name is present. |
    | `author_icon` | string | A url to an image up to 82x82 px that will display to the left of the author's name. Will only work when author_name is present. |

    ##### Fields

    | Property | Type | Description |
    |-|-|-|
    | `title` | string | A string that will display as the title for an individual field. |
    | `value` | string | A string that will display under the field title (Markdown). |
    | `style` |  string | An enumerated string (either `Short` or `Long`) to indicate the width of the message. Defaults to `Long`. |

    ##### Footers

    | Property | Type | Description |
    |-|-|-|
    | `footer` | string | A string used to be displayed as the body of the footer. |
    | `footer_icon` | string | A URL used to display a 32x32px icon to the left of the footer. |
    | `ts` |  ts | Unix timestamp to be formatted and displayed to the right of the footer. |

=== "Version 1"

    Older RingCentral apps may still be using our legacy card schema. The version 1 schema is only supported with incoming webhook URLs that lack a version specifier, for example:

    * `https://hooks.glip.com/webhooks/abcdefg...`
    * `https://hooks.ringcentral.com/webhooks/abcdefg...`

    ### Example message and attachment

	```http
    POST /webhook/eyJhbGciOiJI.xxxxxx.zI1NiIsInR5cCI6IkpXVCJ9
    Host: hooks.ringcentral.com
    Content-Type: application/json

    {!> code-samples/team-messaging/adaptive-cards/legacy-v1.json !}
	```

    ### Schema

    | Property | Type | Required? | Description |
    |-|-|-|-|
    | `author_name` | string | No | Small text used to display the author's name. |
    | `author_link` | string | No | A valid URL that will hyperlink the author_name text mentioned above. Will only work if author_name is present. |
    | `author_icon` | string | No | A valid URL that displays a small 16x16px image to the left of the author_name text. Will only work if author_name is present. |
    | `color` | string | No | A Hex color code that determines the color of the side border of the Interactive Message. |
    | `image_url` | string | No | A string url used to display a single image at the bottom of a message. We currently support GIF, JPEG and PNG. RingCentral only support "HTTPS" Urls. If the URL is a http url we show a placeholder. |
    | `fallback` | string | Yes | A string of default text that will be rendered in the rarest case in which the client does not support Interactive Messages. |
    | `fields` | Array of Field | No | An array of objects that will render indvidual subsections within a message. (see Fields below) | 
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

## Mini-Markdown: a RingCentral flavor of Markdown

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



