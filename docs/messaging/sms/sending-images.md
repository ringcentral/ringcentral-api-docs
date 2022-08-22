# Sending Images over SMS

One can send images and other files via SMS as well. Doing so requires developers to POST to the `sms` endpoint using multipart form-data, or attachments. In the following example we will transmit an image called `test.jpg` along with the text message, "hello world."

## Creating Attachments

When assembling a multipart message, it is important to remember that the root part, or first part of the request is always the request body or payload. Subsequently you attach images and files to the request. You can see how this is done via the code samples below.

!!! warning "Attachment Limitations"
    * There is a combined limit of 1.5M bytes for all attachments.
    * There is a limit of 10 attachments for any request.

=== "JavaScript"

    ```javascript
    {!> code-samples/messaging/send-mms.js !} 
    ```

=== "Python"
	
    ```python
    {!> code-samples/messaging/send-mms.py !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/send-mms.php !}
    ```
