# Delivery Report

Delivery reports are a way to track if your messages are getting sent properly.

---

## What is a delivery report?

After receiving a message, the handset responds to the operator with Delivery Report (DLR) so that Messente knows if and when the message was delivered.

Each time you send a message, Messente generates an ID that is unique to this particular message.

!!! note
    There are 2 ways you can get the status of the sent messages:

    * Add a callback URL to your message. Messente will make a POST request with the relevant information to the callback any time the message status changes (suggested option).
    * You can request a delivery report by manually making a call to the API.

!!! tip
    The easiest way to use Omnichannel API is with our [official libraries](development-libraries.md). They will take care of authentication, request validation and response handling automatically.

---

## Option 1. Add a callback URL to the message

Messente will make a HTTP POST request to the URL in dlr_url property for every status update.

### Callback URL

The provided Delivery report URL (dlr_url) endpoint should respond with a HTTP status code within the range 200-399, otherwise the DRL will be considered undelivered.

To [validate the authenticity](https://messente.com/documentation/api-setup/security/) of callback request, you can use the X-Messente-Signature header.

=== "Python"

    ```python
    {!> code-samples/messaging/global-business/get-dlr.py !}
    ```

=== "Node"

    ```javascript
    {!> code-samples/messaging/global-business/get-dlr.js !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/global-business/get-dlr.php !}
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/global-business/get-dlr.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/global-business/get-dlr.rb !}
    ```

=== ".NET"

    ```csharp
    {!> code-samples/messaging/global-business/get-dlr.cs !}
    ```

=== "cURL"

    ```bash
    {!> code-samples/messaging/global-business/get-dlr.sh !}
    ```

### Report structure in callback request

Example of a successful message.

```json
{
  "status": "DELIVRD",
  "sender": "MySender",
  "err": 0,
  "message_id": "3e28ec48-d620-4191-a96e-d91ba8ecc949",
  "to": "+3725555555",
  "channel": "sms",
  "error": null,
  "omnimessage_id": "d7248cda-6c1a-4436-acf5-aaf249bb67d3",
  "timestamp": "2020-02-04T08:09:42.389630",
  "price_info": {
    "part_price": "0.1",
    "parts_count": 2,
    "total_price": "0.2"
  }
}
```

---

## Option 2. Make an API call

For most cases using dlr_url is a more suitable approach. Sometimes it's useful (usually for debugging purposes) to request the status of a specific message. In that case you can make a request to the API with the Omnimessage ID you need status of.

=== "Python"

    ```python
    {!> code-samples/messaging/global-business/get-sync-dlr.py !}
    ```

=== "Node"

    ```javascript
    {!> code-samples/messaging/global-business/get-sync-dlr.js !}
    ```

=== "PHP"

    ```php
    {!> code-samples/messaging/global-business/get-sync-dlr.php !}
    ```

=== "Java"

    ```java
    {!> code-samples/messaging/global-business/get-sync-dlr.java !}
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/messaging/global-business/get-sync-dlr.rb !}
    ```

=== ".NET"

    ```csharp
    {!> code-samples/messaging/global-business/get-sync-dlr.cs !}
    ```

=== "cURL"

    ```bash
    {!> code-samples/messaging/global-business/get-sync-dlr.sh !}
    ```

!!! danger "Caution"
    Requesting regular updates for every message via API calls is very resource-heavy and costly approach. Before implementing, please consider using Option 1.

### Report structure in API response

Example of a successful message.

```json
{
  "omnimessage_id": "6e29aeef-f43d-4dc0-bd12-195374c845fa",
  "statuses": [
    {
      "status": "DELIVRD",
      "sender": "MySender",
      "err": 0,
      "message_id": "3e28ec48-d620-4191-a96e-d91ba8ecc949",
      "to": "+3725555555",
      "channel": "sms",
      "error": null,
      "omnimessage_id": "d7248cda-6c1a-4436-acf5-aaf249bb67d3",
      "timestamp": "2020-02-04T08:09:42.389630",
      "price_info": {
        "part_price": "0.1",
        "parts_count": 2,
        "total_price": "0.2"
      }
    }
  ],
  "to": "RECIPIENT"
}
```

### Difference between `omnimessage_id` and `message_id`
`message_id` is a unique identifier for a single message and `omnimessage_id` groups messages that are sent with multi-channel fallback.

Although Omnichannel API can easily be used to send single messages we've built it with multi-channel capabilities in mind. To allow easy migration between the two we add `omnimessage_id` to every message.

---

## List of Message Statuses

There can be various reasons why a message wasn't delivered or hasn't been delivered yet.

| Status Constant | Description |
| --- | --- |
| ACK | Operator has accepted the message for delivery |
| DELIVRD | The message has been successfully delivered to the handset |
| UNDELIV | Unable to deliver message to the handset |
| FAILED | Failed to deliver message to the handset |
| UNKNOWN | Unknown status has been reported by the operator |
| ACCEPTD | Message has been accepted for the delivery and is in the operators's delivery queue |
| REJECTD | The message was rejected by the operator |
| EXPIRED | Delivery of the message expired |
| NACK | The message delivery has been rejected |
| SEEN | The message has been seen by the recipient |

[Complete API Specification](https://messente.com/documentation/messente-api/omnimessage/)

## Our IP Addresses

For security reasons, you might want to restrict access to your callback URL. Here is the list of IP addresses we use to send requests from, which you can whitelist:

* 95.216.221.43
* 159.69.33.20
