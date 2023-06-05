# Sending Faxes

Faxes remain a key way in which many business and industries share and transmit documents, and is another type of message that can be sent using the RingCentral SMS and Fax API. Using this API, developers can send one or more documents at a time to a single recipient. This for example makes it possible for a developer to attach and transmit a cover page that is stored independently from the core document being transmitted.

The Fax API is different from other RingCentral APIs in that it packages the message and each document as a separate MIME attachment. The root attachment is a JSON object which specifies the recipient(s) of the fax, the fax quality (resolution), the cover page text and other necessary parameters such as a predefined cover page. Subsequent attachments are the documents to be transmitted in sequence. The Fax API accepts both `multipart/form-data` and `multipart/mixed` [content-type headers](../fax-multipart-formats).

To send a fax message using the Fax API, you cannot set the "from" phone number. Instead, the server will choose the preselected fax number from your extension outbound Fax settings in your [user extension service portal](https://service.ringcentral.com). Therefore, if you need to use your direct number to send Fax messages, login your service Web portal and change your outbound Fax settings.

You can schedule to send a fax by specify the `sendTime` parameter to a future date and time. If you need to delete/cancel a scheduled fax message, you must keep the fax message id, and use the message id to delete the message from the message store using the [delete message API](https://developers.ringcentral.com/api-reference/Message-Store/deleteMessage).

### RingCentral platform supported FAX content types

| Application Type | File Extension |
|-|-|
| `Adobe Acrobat / Adobe Reader` | .pdf |
| `Adobe PhotoShop` | .psd |
| `Microsoft Word` | .doc, .docx |
| `Microsoft Word Document Template` | .dot |
| `Microsoft Word for Mac` | .mcw |
| `Microsoft Excel` | .xls, .xlsx, .xlsb |
| `Microsoft PowerPoint` | .ppt, .pptx |
| `Microsoft Visio` | .vsd, .vdx |
| `Microsoft Publisher` | .pub |
| `Microsoft Works` | .wps |
| `Microsoft Windows Write` | .wri |
| `Microsoft Fax` | .awd |
| `Generic Graphic Formats` | .tif, .tiff, .gif, .jpg, .jpeg, .bmp, .png, .pcx, .tga |
| `Rich Text Format` | .rtf |
| `Text Files` | .txt, .log, .h, .cpp, .c, .err, .hpp |
| `Lotus 1-2-3` | .wk1, .wk3, .wk4 |
| `Quattro Pro DOS` | .wq1 |
| `Extensible Markup Language` | .xml |
| `Hypertext Markup Language` | .html, .htm |
| `Comma Separated Values` | .csv |

!!! warning "Attachment Limitations"
    * The combined size of all attachments does not exceed 50 MB.
    * The file name of the attached files does not include ampersands (e.g. &) or other special characters such as @#$%^&*, etc...
    * The attachments does not exceed 200 pages.

!!! note "Transmission speed"
    The time required for transmitting fax messages depends on the quality and content of the fax that will be sent. For documents that contain mostly text, it usually takes approximately 1 minute per page for the document to be delivered. When sending documents that contain graphics (scanned pages of documents), or for faxes sent to a slow fax line, it may take 5 minutes per page or more to be delivered.

## Attaching Documents

Documents being sent via fax can reside on the server's file system and be attached as a local file. For example, in Javascript you can attach a local file in the following manner:

```javascript
form = new FormData();
form.append('fax-document-1', require('fs').createReadStream('test.pdf'));
```

For larger files, it may be more economical to stream the file via a URL:

```javascript
var form = new FormData();
http.request('https://www.ringcentral.com/content/dam/rc-2018/en_us/images/logo.jpg', function(response) {
  form.append('fax-document-1', response);
});
```

Bear in mind of course that each language will utilize different libraries and capabilities with regards to creating MIME attachments.

## Code Samples

The following code samples show how to send a simple single document fax.

!!! note "Running the code"
    * If you have tried the [SMS quick start]((../../quick-start/)), you can just copy all the functions below and add them to the quick start project then call the `send_fax()` function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.
    * If you run on your production account, remember to use app credentials for production and change the RingCentral server URL to "https://platform.ringcentral.com"

=== "JavaScript"

    ```javascript
    {!> code-samples/messaging/code-snippets-headers/header.js !}
    {!> code-samples/messaging/code-snippets/send-fax.js [ln:10-]!}
    ```

=== "Python"

    ```python
    {!> code-samples/messaging/code-snippets/send-fax.py !}
    {!> code-samples/messaging/code-snippets-headers/footer.py !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/code-snippets-headers/header.php !}
    {!> code-samples/messaging/code-snippets/send-fax.php [ln:2-]!}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/code-snippets/send-fax.rb !}
    {!> code-samples/messaging/code-snippets-headers/footer.rb !}
    ```

=== "C#"

    ```c#
    {!> code-samples/messaging/code-snippets/send-fax.cs !}
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/code-snippets/send-fax.java !}
    ```
