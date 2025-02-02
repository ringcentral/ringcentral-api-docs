# Creating Webhooks

RingCentral supports oubound webhooks as a method of receiving notifications about events of interest to an application.

## Registering a URL to receive webhooks from RingCentral

To create a webhook, you will first need a server that listens on a specific URL for events. You will register this webhook URL with RingCentral when creating the subscription via the Subscription API.

When you create a webhook subscription, RingCentral will transmit a test request to the designated URL in an attempt to verify all of the following prior to creating the subscription and transmitting events. 

1. The URL must accessible by RingCentral and not behind a firewall
2. The web server supports TLS 1.2 or higher (see note below about TLS support)
3. The web server must respond within 3000 milliseconds 
4. The web server must respond with an HTTP status code of 200 OK
4. The web server must respond with a valid `Validation-Token` header

!!! info "TLS and SSL requirements"
    TLS/SSL is only required in production. For development purposes, you can use localhost along with a service like [ngrok](https://ngrok.com/), which provides both TLS/SSL and unencrypted tunnels. For information on TLS, see [Configuring TLS/SSL](configuring-tls-ssl.md)

### Validating webhook URLs upon subscription creation

To ensure that the endpoints RingCentral interfaces with via webhooks are designed for RingCentral, RingCentral transmits a validation token in an HTTP header whenever a new webhook subscription is created. It is the expectation of RingCentral that your webhook handler echo back this validation token in the response via its own HTTP response header. 

Below is an example of how validation tokens should be echoed in a trivial PHP app.

=== "PHP"

    ```php
    {!> code-samples/webhooks/verification.php !} 
    ```

=== "Ruby"

    ```ruby
    {!> code-samples/webhooks/verification.rb !} 
    ```

## Subscribing to events via a webhook

Webhook subscriptions are created using our [Subscription API](https://developers.ringcentral.com/api-reference/Subscriptions/createSubscription). The specific events you wish to receive a webhook for is specified via the `eventFilters` parameter. Each event filter corresponded to a different event you wish to be notified of. Furthermore, some event filters can be further refined via an event filter parameter which can further constrain the set of events you subscribe to, e.g. "I only want to receive to events pertaining to this specific webinar" (as opposed to all webinars). 

Our API Reference is the definitive source for all the required fields in creating a subscription. The following sample request should however help you better understand at a high-level how a webhook subscription is created. 

```json
{!> code-samples/webhooks/create-webhook-request.json !} 
```

## Renewing webhooks that are about to expire

RingCentral webhooks can be effectively configured to never expire if their expiration date is set far enough into the future. However, it can be beneficial in some circumstances to be more conservative and subscribing to events for a set period of time. If that is helpful to you, then you may also need to occassionally renew webhooks subscriptions. 

To help keep webhooks active and alive and not be impacted by their expiration, applications can subscribe to special reminder events using a subscription event filter. By passing an `expiresIn` property to this filter, one can be notified of a subscription prior to it expiring. 

The subscription event filter has the following format, and uses a `threshold` and `interval` parameter to govern when reminders are sent and how often:

`/restapi/v1.0/subscription/~?threshold=XXX&interval=YYY`

| Property | Description |
|----------|-------------|
| `threshold` | the threshold time (in seconds) remaining before subscription expiration when server should start to send renewal reminder notifications. This time is approximate. It cannot be less than the interval of reminder job execution. It also cannot be greater than a half of this subscription TTL. |
| `interval` |  the interval (in seconds) between reminder notifications. This time is approximate. It cannot be less than the interval of reminder job execution. It also cannot be greater than a half of threshold value. |

## Updating an existing webhook

To update a webhook, make a `PUT` request to the webhook subscription endpoint with the required event filters specified in the request body. Each `PUT` call, either sent with the event filters or with an empty body, automatically renews the subscription, updating its expiration time. 

The renew a webhook, you can also make a `POST` request to the [subscription renew endpoint](https://developers.ringcentral.com/api-reference/Subscriptions/renewSubscription).

## Retrieve a list of active webhook subscriptions

To see a list of all the webhook and event subscriptions that are currently active, make a `GET` request to the [subscription endpoint](https://developers.ringcentral.com/api-reference/Subscriptions/listSubscriptions). This will return a list of all subscriptions, including webhooks and PubNub push notifications.

## Troubleshooting

!!! info "SUB-525 Webhook server response is invalid"
    When conducting a token validation request from RingCentral, be sure to transmit the HTTP header of "Content-type: application/json", even if your response's body is empty. 
