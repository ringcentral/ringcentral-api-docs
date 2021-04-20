# Receiving Webhooks

Once a [webhook has been created](../creating-webhooks/) then events will start being transmitted to the webhook URL you designated.

## Validating incoming webhooks

To ensure that the endpoints RingCentral interfaces with via webhooks are designed for RingCentral, "validation tokens" are transmitted amongst the HTTP request headers. It is the expectation of RingCentral that your webhook handler echo back this validation token in the response via an HTTP response header. 

Below is an example of how validation tokens should be echoed in a trivial PHP app.

```php
<?php
// Get validation token
$v = isset($_SERVER['HTTP_VALIDATION_TOKEN']) ? $_SERVER['HTTP_VALIDATION_TOKEN'] : ‘’;
// Return validation token as header
if (strlen($v) > 0) {
  header("Validation-Token: {$v}");
}
?>
```

## Verifying incoming webhooks are authorized

Verification tokens are an optional way of further verifying/validating an incoming webhooks and are specifically designed to deflect man-in-the-middle attacks.

Verification tokens are arbitrary strings specified by the developer when a webhook is created. When provided by the developer, they will transmitted in an HTTP header by RingCentral along with every webhook. This provides the developer with the means of independently verifying that the webhook was transmitted by RingCentral.

Take the following C# code for example:

```c#
var subscriptionInfo = await rc.Restapi().Subscription().Post(new CreateSubscriptionRequest
{
  eventFilters = new[] {"/restapi/v1.0/account/~/extension/~/presence?detailedTelephonyState=true"},
  deliveryMode = new NotificationDeliveryModeRequest
  transportType = "WebHook",
  address = "https://75ef5993.ngrok.io/webhook",
  verificationToken = "hello-world"
});
```

When we setup the WebHook, we include `deliveryMode.verificationToken` in the request body. And whenever a webhook is sent, there will be a `Verification-Token` in the headers:

```http
headers:
  accept: "application/json"
  accept-encoding: "UTF-8"
  content-length: "919"
  content-type: "application/json; charset=UTF-8"
  host: "73634927340.ngrok.io"
  user-agent: "RingCentral-Webhook/8.3"
  verification-token: "hello-world"
  x-forwarded-for: "192.209.29.132"
  x-forwarded-proto: "https"
```



