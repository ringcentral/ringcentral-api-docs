# Sending Faxes

Faxes remain a key way in which many business and industries share and transmit documents, and is another type of message that can be sent using the RingCentral SMS and Fax API. Using this API, developers can send one or more documents at a time to a single recipient. This for example makes it possible for a developer to attach and transmit a cover page that is stored independently from the core document being transmitted.

The Fax API is different from other RingCentral APIs in that it packages the message and each document as a separate MIME attachment. The root attachment is the main API message that identifies the recipient of the fax. Subsequent attachments are the documents to be transmitted in sequence. A typical call to the Fax API therefore follows this format:

1. Body of the Request
2. Cover Page
3. Main Document

## Attaching Documents

Documents being sent via fax can reside on the server's file system and be attached as a local file. For example, in Javascript you can attach a local file in the following manner:

```javascript
form = new FormData();
form.append('fax-document-1', require('fs').createReadStream('test.jpg'));
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

=== "JavaScript"

    ```javascript
    {!> code-samples/messaging/send-fax.js !} 
    ```

=== "Python"

    ```python
    {!> code-samples/messaging/send-fax.py !} 
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/send-fax.php !} 
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/send-fax.java !} 
    ```

=== "C#"

    ```c#
    {!> code-samples/messaging/send-fax.cs !} 
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/send-fax.rb !} 
    ```
