# Sending MMS

One can send multimedia content via SMS as well. To send multimedia messages, the requirement is the same as for sending a [text message](sending-sms.md), and the phone number must have the MMS feature enabled.

RingCentral platform supported MMS content types

| Category | MIME | File Extension |
|-|-|-|
| `Image` | image/jpeg | .jpeg/.jpg |
| | image/png | .png |
| | image/bmp | .bmp |
| | image/gif | .gif |
| | image/tiff | .tiff/.tif |
| | image/svg+xml | .svg |
| `Video` | video/3gpp | .3gp |
| | video/mp4 | .mp4 |
| | video/mpeg | .mpeg |
| | video/msvideo | .avi |
| `Audio` | audio/mpeg | .mp3 |
| `V-Card` | text/vcard | .vcf/.vcard |
| `Compressed file` | application/zip | .zip |
| | application/gzip | .gzip |
| `Document` | application/rtf | .rtf |

!!! warning "Attachment Limitations"
    * There is a combined limit of 1.5MB for all attachments per message.
    * There is a limit of 10 attachments per message.

There is an alias `/mms` endpoint for sending MMS messages, but you can also call the `/sms` endpoint to send MMS messages. The API takes mixed contents, a JSON object which specifies the "from" and "to" phone numbers as well as the text content. And attachments which includes multimedia files. Therefore, you must use multipart form-data, and set the content-type header to `multipart/mixed`.

## Creating Attachments

When creating a multipart message, it is important to remember that the root part, or first part of the request is always the request body or payload. Subsequently you attach media files to the request. In the following example we will send an image named `test.jpg` along with the text message, "Hello world"

!!! note "Running the code"
    * If you have tried the [SMS quick start](../quick-start.md), you can just copy all the functions below and add them to the quick start project then call the `read_extension_phone_number_detect_mms_feature()` function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.
    * If you run on your production account, remember to use app credentials for production and change the RingCentral server URL to "https://platform.ringcentral.com"

=== "JavaScript"

    ```javascript
    {!> code-samples/messaging/code-snippets-headers/header.js !}
    {!> code-samples/messaging/code-snippets/send-mms.js [ln:10-] !}
    ```

=== "Python"

    ```python
    {!> code-samples/messaging/code-snippets/send-mms.py !}
    {!> code-samples/messaging/code-snippets-headers/footer.py!}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/code-snippets-headers/header.php !}
    {!> code-samples/messaging/code-snippets/send-mms.php [ln:2-]!}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/code-snippets/send-mms.rb !}
    {!> code-samples/messaging/code-snippets-headers/footer.rb !}
    ```

=== "C#"

    ```c#
    {!> code-samples/messaging/code-snippets/send-mms.cs !}
    ```

=== "Java"

    ```Java
    {!> code-samples/messaging/code-snippets/send-mms.java !}
    ```
