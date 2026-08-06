# SMS Message

Sending SMS messages with the Global Business SMS API.

---

!!! tip
    The easiest way to use the Global Business SMS API is with our [official libraries](development-libraries.md). Libraries will take care of authentication, request validation and response handling.

## Send a single SMS

Use the following example to send an SMS using Omnichannel API.

=== "Python"

    ```python
    {!> code-samples/messaging/global-business/send-single-sms.py !}
    ```

=== "Node"

    ```javascript
    {!> code-samples/messaging/global-business/send-single-sms.js !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/global-business/send-single-sms.php !}
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/global-business/send-single-sms.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/global-business/send-single-sms.rb !}
    ```

=== ".NET"

    ```csharp
    {!> code-samples/messaging/global-business/send-single-sms.cs !}
    ```

=== "cURL"

    ```bash
    {!> code-samples/messaging/global-business/send-single-sms.sh !}
    ```

The API will return a response with an **omnimessage_id**, as well as a **message_id** for each "sub-message" (fallback channel). You can use these IDs to track the [delivery status](delivery-report.md) of the message.

```json
{
  "messages": [
    {
      "channel": "sms",
      "message_id": "fr593ce7-68de-5e44-bc50-044a3ad0a7fa",
      "sender": "YOUR_PHONE_NUMBER"
    }
  ],
  "omnimessage_id": "632c6f3d-49d0-4a8f-5k2n-74023d31e51d",
  "to": "RECIPIENT_PHONE_NUMBER"
}
```

---

## Constructing Messages

There are few things to keep in mind when composing SMS messages.

### Be aware of non-GSM friendly characters

A single SMS can contain 160 characters. However, SMS is built to use 7-bit GSM 03.38 character encoding set and this means that certain unicode characters (that are not in GSM character set) don't fit into the message. You can use an SMS length calculator to check how many characters your message contains and how many SMS messages it will take to send it.

If your message contains any characters not listed in the 7-bit alphabet then the message encoding will be set to UCS-2. With it, the message length is limited to 70 characters.

**By default, the API will convert all non-GSM friendly characters to similar characters in GSM 03.38 encoding set.** This allows you to send messages with non-unicode characters and not worry about the GSM specification.

!!! info
    You can turn the character replace feature off by configuring the `autoconvert` parameter in the message.

    ```text
    autoconvert: on(default)|full|off
    ```

## Message Validity and Retry Policy

The SMS request is forwarded to the operators, who, in turn, will retry SMS delivery for a **minimum of 6 hours.**

That being said, operators differ in their policies so some may retry SMS delivery up to 48 hours in total, starting with shorter retry intervals and switching to longer retry intervals towards the end. Some, on the other hand, may only retry for the required minimum of 6 hours indicated by us.


### Error example

```json
{
  "errors": [
    {
      "code": "105",
      "detail": "Invalid or disallowed sender Messente",
      "source": "payload[sms][sender]",
      "title": "Invalid data"
    }
  ]
}
```

| Field | Description |
| --- | --- |
| `title` | Error message |
| `detail` | Longer description of the error message |
| `source` | Location in the request body for this error message |
| `code` | Machine-readable error code:<br>101 - Not found<br>102 - Forbidden<br>103 - Unauthorized<br>104 - Internal Server Error<br>105 - Invalid data<br>106 - Missing data<br>107 - Method not allowed |
