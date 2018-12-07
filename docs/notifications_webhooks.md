# Subscribing to and Using Webhooks

RingCentral's Connect Platform supports oubound webhooks as a method of receiving push notifications.

## Create a Webhook URL

To create a webhook, you'll need webserver that listens on a specific URL for events, known as the webhook URL, that you will configure when creating the subscription. The webhook URL service must meet the following requirements:

1. is available on the Internet
2. has a TLS / SSL enabled*
3. can respond within 1000 milliseconds with 200 OK
4. will respond with `Validation-Token` header on subscription

TLS / SSL only needs to be enabled in production. For development purposes, TLS is not necessary.

For development purposes, you can use localhost along with a service like [ngrok](https://ngrok.com/).

**Example URL**

To subscribe, the webhook URL must return a `Validation-Token` header when it is presented with one.

Here is a minimal example using PHP:

```php
<?php
$v = isset($_SERVER['HTTP_VALIDATION_TOKEN']) ? $_SERVER['HTTP_VALIDATION_TOKEN'] : '';
if (strlen($v)>0) {
  header("Validation-Token: {$v}");
}
?>
```

## Create a Webhook

A webhook subscription can be created by making a post to the `subscription` endpoint:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `v1.0/subscription` | Create a webhook subscription |

**Example Request**

```http
POST /restapi/v1.0/subscription
Accept: application/json
Content-Type: application/json
Authorization: Bearer MyToken

{
  "eventFilters": [
    "/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true&sipData=true",
    "/restapi/v1.0/account/~/extension/~/message-store",
    "/restapi/v1.0/account/~/extension/~/presence/line",
    "/restapi/v1.0/account/~/extension"
  ],
  "deliveryMode": {
    "transportType": "WebHook",
    "address": "https://myapp.ngrok.io/hook?auth_token=MySecureToken"
  }
}
```

## Create Webhook Renewal Event Filter

RingCentral webhooks expire and will expire unless they are renewed. A webhook subscription can also subscribe for special reminder events. The reminder events have a simple body with an `expiresIn` property containing the expiration time in seconds.

The subscription event filter has the following format with the `threshold` and `interval` parameters to govern when reminders are sent and how often:

`/restapi/v1.0/subscription/~?threshold=XXX&interval=YYY`

| Property | Description |
|----------|-------------|
| `threshold` | the threshold time (in seconds) remaining before subscription expiration when server should start to send renewal reminder notifications. This time is approximate. It cannot be less than the interval of reminder job execution. It also cannot be greater than a half of this subscription TTL. |
| `interval` |  the interval (in seconds) between reminder notifications. This time is approximate. It cannot be less than the interval of reminder job execution. It also cannot be greater than a half of threshold value. |

## Update & Renew a Webhook

To update a webhook, make a `PUT` call to the webhook endpoint with the required event filters specified in the request body. Each `PUT` call, either sent with the event filters or with an empty body, automatically renews the subscription, updating its expiration time. 

The renew a webhook, you can also make a `POST` call to the subscription renew endpoint.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `v1.0/subscription/{subscriptionId}/renew` | Renew a webhook subscription |

## Read Webhook List

To retrieve a list of webhooks, make a `GET` call to the subscription endpoint. This will return subscriptions using both webhooks and PubNub.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `v1.0/subscription` | Read a webhook list |
