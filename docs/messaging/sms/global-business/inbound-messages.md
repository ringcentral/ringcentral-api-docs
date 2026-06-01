---
id: inbound-messages
title: Inbound Messages
slug: /omnichannel-api/inbound-messages
---

# Inbound Messages

Handling inbound SMS for two-way communication.

---

!!! tip
    The easiest way to use Omnichannel API is with our [official libraries](development-libraries.md). Libraries will take care of authentication, request validation and response handling.

## Inbound Message Callback

Messente makes a HTTP POST request with JSON content to configured Inbound Number Callback URL with the following request parameters:

* msg_id
* sub_msg_id
* channel
* recipient
* time
* text
* sender

###  Example request
```json
POST / HTTP/1.1
Content-Type: application/json
X-Messente-Signature: 9a398f4a9ce4f96077e70b65d208420640aabb158c224bd0f29391d673ba6b3d

{
    "msg_id": "1f5197ec-b4d7-4d5f-8bba-e005d1cadba1",
    "sub_msg_id": "d276e75e-e9f5-4b44-88aa-d5c7b38a1e4a",
    "channel": "sms",
    "recipient": "1234",
    "time": "2021-02-23T14:51:13.000000Z",
    "text": "This is a test message content",
    "sender": "+44000000000"
}
```

## Validating the request authenticity

Messente provides every request with signature calculated using [HMAC](https://en.wikipedia.org/wiki/HMAC). The signature is calculated using the Shared Secret, available in the Inbound Numbers section of the Developers view.

Calculated signature is provided in the HTTP headers called `X-Messente-Signature`.

### Signature calculation formula

```php
HMAC_SHA256("$shared_secret", "$http_request_body")
```
