# Outgoing events and webhooks for Team Messaging

Outgoing events and webhooks refer to the events that are emitted from the RingCentral platform in response to the actions taken within our product by users or agents.

!!! info "Outgoing Webhooks vs Incoming Webhooks"
    Outgoing webhooks refer the to events that the RingCentral system emits, whereas [Incoming Webhooks](../webhook-creation) refer to a system by which third-parties can more easily post messages into a designated team or chat. 

## Outgoing event structure

Every event emitted by the RingCentral platform conforms to a simple structure, and contains the following elements.

| Property | Type | Description |
|-|-|-|
| `event` | string | An generalized identifier that describes the type of the evet being described. This will make clear the account and extension of the event's owner. |
| `subscriptionId` | string | The id of the subscription for which this event is associated. |
| `body` | struct | The event payload that varies based on the event type. |
| `uuid` | string | A unique identifier for this specific event being transmitted. |
| `timestamp` | string | The system timestamp the event was triggered. |

**Example**

```json
{
  /* ... meta info ... */
  "event": "/restapi/v1.0/account/12345/extension/12345/glip/groups",
  "subscriptionId": "4f762cab-b663-4d66-9a17-01b11934e2a9",
  /* ... Event ... */
  "body": {
      /* ... notification payload ... */
      "data": {
         "eventType": "GroupAdded",
         ...
      }
   },
   "uuid": "aed51897-f286-4a98-8862-5a5b2497167e",
   "timestamp": "2016-06-27T09:07:06.694Z"
}
```

## Subscribing to an outgoing event

RingCentral maintains a [generalized subscription framework](../../../notifications/) through which all outgoing events emitted by the platform can be subscribed to by a developer. This system allows developers to elect how they wish to receive an event, for example via a webhook, or via PubNub.

In order to subscribe to an outgoing event, your application must have the "Webhook Subscription" scope associated with it. 

RingCentral allows developers to subscribe to specific events by specifying an "event filter." This allows you to subscribe to only the events you need so that you do not innudate your servers with unwanted and/or unnecessary event traffic. 

To get started, try one of our quick starts:

* [Webhook subscription quick start](../../../notifications/webhooks/quick-start/)
* [PubNub subscription quick start](../../../notifications/push-notifications/quick-start/)

### Webhook Validation

One thing to be mindful when subscribing to an event is the need to validate that webhook was created by you and that the URL provided is properly configured to receive webhook notifications. To validate a webhook, RingCentral will transmit a message with no payload that contains a `Validation-Token`. The receiving service should respond by echo'ing the validation token in its HTTP headers as shown below.

!!! warning "What if you don't validate the webhook?"
    If you fail to validate the token in the manner described, the webhook will not be created and you will not receive any subsequent events. 

#### Request sent to webhook URL to request validation

```http
POST <postbackUri> HTTP/1.1
Validation-Token: wtdwi2y88489yr34iwegsekshwekfhsdfh
Verification-Token: xzbcnzbcczxcnzxsjfhkjkfhsdkssfsfsfs
Content-Length: 0
```

#### Response returned to verify the webhook

```http
HTTP/1.1 200 OK
Validation-Token: wtdwi2y88489yr34iwegsekshwekfhsdfh
```

### Verifying webhooks

Every webhook emitted by RingCentral can be accompanied by a private verification token. This token is generated within the Developer Console, and can be used to ensure the authenticity of the received webhook. To get started, generate a verification token, and then compare it to the token transmitted to your application via the `Verification-Token` HTTP header.

<img class="img-fluid" src="../webhook-verification.png" style="max-width: 500px">

### Webhook Payloads

The payload of a webhook depends upon the event that triggered it. We support the following events:

* [Post events](../events-posts/)
* [Chat events](../events-groups/)
* [Incoming Webhook events](../events-incoming-webhooks/)
