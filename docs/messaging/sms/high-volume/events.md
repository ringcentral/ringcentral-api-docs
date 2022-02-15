# High Volume SMS Event Notifications

Push notifications can be used at various levels to stay updated on everything going on with your high volume SMS, from a High Volume SMS batch to an individual message level.

The following push notifications are available.

1. [Message batch events](#message-batch-events): Provides updates on the individual batch status
2. [Inbound message events](#inbound-message-events): Provides updates on an incoming message to a number
3. [Outbound message events](#outbound-message-events): Provides updates on the delivery status of outbound messages
4. [Opt-out events](#opt-out-events): Provides updates to track customers who opted out

## Message Batch Events

Batch level push notifications provide updates on batch status. A batch could have two states "Processing" and "Completed". The following event filters are supported

| Event Filter | Description |
|-|-|
| `/restapi/v1.0/account/~/a2p-sms/batches` | Notification for any batch status changes on that account |
| `/restapi/v1.0/account/~/a2p-sms/batches?from={e164PhoneNumber}` | Notification on batches from a specific From number in E.164 format, e.g. `+16505550100` |

## Inbound Message Events

Notify incoming messages on a phone number. The following event filters are supported.

| Event Filter | Description |
|-|-|
| `/restapi/v1.0/account/~/a2p-sms/messages?direction=Inbound` | Notification on inbound messages to current account |
| `/restapi/v1.0/account/~/a2p-sms/messages?direction=Inbound&to={e164PhoneNumber}` | Notification on inbound messages to a given phone number. |

## Outbound Message Events

Notify the delivery status of outbound messages. The following event filters are supported.

| Event Filter | Description |
|-|-|
| `/restapi/v1.0/account/~/a2p-sms/messages?direction=Outbound` | All outbound messages in an account |
| `/restapi/v1.0/account/~/a2p-sms/messages?direction=Outbound&from={e164PhoneNumber}` | Notification on Outbound Messages from a specific phone number in E.164 format, e.g. `+16505550100` |

## Opt-Out Events

Opt-out events are sent when a user connects to RingCentral's opt out service using standard keywords including `stop`,  `start`, etc.

| Event Filter | Description |
|-|-|
| `/restapi/v1.0/account/~/a2p-sms/opt-outs` | All opt-outs and opt-ins for a given account |
| `/restapi/v1.0/account/~/a2p-sms/opt-outs?from={e164PhoneNumber}` | Notification on opt-outs and opt-ins from a specific From number in E.164 format, e.g. `+16505550100` |

### Example Opt-Out Event

An opt-out event is sent when a user texts `stop` to one of your High Volume SMS numbers.

You will receive an event like the following which indicates that the Opt-Out service is `active` for sending messages `from` a number `to` a number.

=== "Opt-Out Event"

    ```json
    {
      "uuid":"12345678901234567890",
      "event":"/restapi/v1.0/account/11111111/a2p-sms/opt-outs",
      "timestamp":"2020-10-01T00:00:00.000Z",
      "subscriptionId":"11112222-3333-4444-5555-666677778888",
      "ownerId":"22222222",
      "body":{
         "from":"+16505550100",
         "to":"+12125550100",
         "active":true
      }
    }
    ```

### Example Opt-In Event

An opt-in event is sent when a user texts `start` to one of your High Volume SMS numbers.

You will receive an event like the following which indicates that the Opt-Out service is **not** `active` for sending messages `from` a number `to` a number.

=== "Opt-In Event"

    ```json
    {
      "uuid":"12345678901234567891",
      "event":"/restapi/v1.0/account/11111111/a2p-sms/opt-outs",
      "timestamp":"2020-10-01T00:00:01.000Z",
      "subscriptionId":"11112222-3333-4444-5555-666677779999",
      "ownerId":"22222222",
      "body":{
        "from":"+16505550100",
        "to":"+12125550100",
        "active":false
      }
    }
    ```
