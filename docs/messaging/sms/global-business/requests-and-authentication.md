---
id: requests-and-authentication
title: Requests & Authentication
slug: /omnichannel-api/requests-and-authentication
---

# Requests & Authentication

Learn the basics of how to make a request and authenticate yourself.

---

!!! tip
    The easiest way to use Omnichannel API is with our [official libraries](development-libraries.md). They will take care of authentication, request validation and response handling automatically.

## Request

### Authentication

Authentication is done using HTTP Basic Authentication with your API username and password. [Sign up](https://dashboard.messente.com/register) to Messente and [receive your API credentials](https://dashboard.messente.com/api-settings) (no credit card required).

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

Configure your account in the [dashboard](https://dashboard.messente.com/api-settings) to allow API requests only from certain IPs.

If you do not have a fixed IP address, you can also specify the [IP address ranges](https://messente.com/blog/messente/whitelist-ip-address-range-sms-api) in CIDR notation.

If you need to disable IP address validation, you can set the value to 0.0.0.0/0 (enable all IPv4 addresses).

!!! danger "Security Warning"
    It is strongly encouraged to whitelist only IP addresses that are used to make HTTP calls to Messente's API.
