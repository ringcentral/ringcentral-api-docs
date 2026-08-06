---
id: requests-and-authentication
title: Requests & Authentication
slug: /omnichannel-api/requests-and-authentication
---

# Requests & Authentication

Learn the basics of how to make a request and authenticate yourself.

---

!!! tip
    The easiest way to use Global Business API is with our [official libraries](development-libraries.md). They will take care of authentication, request validation and response handling automatically.

## Request

### Authentication

Authentication is done using HTTP Basic Authentication with your API username and password. Contact [developer relations](https://developers.ringcentral.com/sms-api#requestinfo) to get started

### Making a Request

API requests are made to the following server:

```text
https://api.messente.com
```

You need to pass the Content-Type headers to the API so the response would be in the correct format.

```text
Accept: application/json
Content-Type: application/json
```

!!! warning
    You need to pass Content-Type and Authentication headers with every request.

Basic request example:

```bash
curl -X POST \
  'https://api.messente.com/v1/omnimessage' \
  -u MESSENTE_API_USERNAME:MESSENTE_API_PASSWORD \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{ "to": "RECIPIENT_PHONE_NUMBER", "messages": [{ "channel": "sms", "sender": "YOUR_PHONE_NUMBER", "text": "Happy messaging!" }] }, "dlr_url": "YOUR_WEBHOOK_URL"'
```

### IP Address Whitelisting

We recommend configuring your account to allow API requests only from certain IPs.

If you do not have a fixed IP address, you can also specify the IP address ranges in CIDR notation.

If you need to disable IP address validation, you can set the value to 0.0.0.0/0 (enable all IPv4 addresses).

!!! danger "Security Warning"
    It is strongly encouraged to whitelist only IP addresses that are used to make HTTP calls to the Global SMS API.
