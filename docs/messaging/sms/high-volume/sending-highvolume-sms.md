# Sending High Volume SMS

The High Volume SMS API provides a very flexible way to send multiple SMS message in a single API request (a.k.a. a batch). In other words, one can send the same text message to different recipients and/or different text messages to different recipients in a single request.

!!! note "There is no limit of number of recipients in a batch. However, the maximum size of each batch is about 50MB."

### Sample codes

Simple request to broadcast the same message to multiple recipients.

!!! note "Running the code"
    * If you have tried the [SMS quick start]((../../quick-start/)), you can just copy all the functions below and add them to the quick start project then call the `read_extension_phone_number_detect_a2psms_feature()` function. Otherwise, edit the variables in ALL CAPS with your app and user credentials before running the code.
    * High volume SMS is not supported on sandbox environment. If you copy/paste the functions below and call them in the quick start project, remember to change the environment to use your app and user credentials for production!

=== "HTTP"

    ```http
    POST /restapi/v1.0/account/~/a2p-sms/batches
    Content-Type: application/json
    Accept: application/json

    {
      "from": "+16505550100",
      "text": "Hello Team",
      "messages": [
        { "to": ["+14155550100"] },
        { "to": ["+12125550100"] }
      ]
    }
    ```

=== "JavaScript"

    ```javascript
    {!> code-samples/messaging/code-snippets-headers/header-prod.js !}
    {!> code-samples/messaging/code-snippets/send-a2p-sms.js [ln:10-] !}
    ```

=== "Python"
    ```python
    {!> code-samples/messaging/code-snippets/send-a2p-sms.py !}
    {!> code-samples/messaging/code-snippets-headers/footer-prod.py !}
    ```

=== "PHP"
    ```php
    {!> code-samples/messaging/code-snippets-headers/header-prod.php !}
    {!> code-samples/messaging/code-snippets/send-a2p-sms.php [ln:2-]!}
    ```

=== "Ruby"
    ```ruby
    {!> code-samples/messaging/code-snippets/send-a2p-sms.rb !}
    {!> code-samples/messaging/code-snippets-headers/footer-prod.rb !}
    ```

=== "C#"
    ```c#
    {!> code-samples/messaging/code-snippets/send-a2p-sms.cs !}
    ```

=== "Java"
    ```java
    {!> code-samples/messaging/code-snippets/send-a2p-sms.java !}
    ```

### Response

The code samples above would all produce a response that would appear similar to the one below.

```json
{
    "id": "3157ac7d-baab-4d0e-1453-deada6c735d2",
    "from": "+16505550100",
    "batchSize": 1,
    "processedCount": 0,
    "status": "Processing",
    "creationTime": "2020-10-12T16:59:55.053902Z",
    "lastModifiedTime": "2020-10-12T16:59:55.053902Z",
    "rejected": []
}
```

!!!Note
    The `rejected` field is a list of invalid numbers (if any). Each item in the `rejected` array is an object contained the index position (starting from 1) of the recipient's phone number in the "messages" array, an error code and a short description of the rejected reason. E.g.:
    ```
    [{"index":2,"to":["+4088070206"],"errorCode":"SMS-RC-410","description":"The recipient number is invalid"}]
    ```
    If your batch contains invalid phone numbers, you will receive the `rejected` list with content only from the response returned by sending a batch. Reading the batch status will always return an empty `rejected` array.
