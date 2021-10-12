# Incoming Webhook events for Team Messaging

An [Incoming Webhook](../../incoming-webhooks/webhook-creation/) is a feature by which third-parties can easily post messages into a team associated with the incoming webhook. Each incoming webhook in some respects represents an integration associated with a given team that has been created and installed by someone. These events, therefore, let developers track the addition of and/or modifications to these third-party integrations. They are useful to perform the following functions:

* Be notified when an integration is deleted so that your app can perform garbage collection, such as removing an event subscription
* Be notified when an integration is installed to automatically setup an event subscription

To subscribe to events relating to the creation, removal or deletion of an incoming webhook, one must [create a subscription](../outgoing-webhooks/#subscribing-to-an-outgoing-event) with the following event filter:

* `/restapi/v1.0/glip/webhooks`

Admittedly, the term "webhook" alone can be confusing in the team messaging context, because RingCentral uses that term to refer to different types of webhooks.

* An "outgoing webhook" is an event RingCentral transmits to third-parties alerting them to events that happen within RingCentral. 

* An "incoming webhook" is an event/message sent to RingCentral by a developer, usually in response to an event that has been triggered outside of RingCentral, but that users of RingCentral would like to be made aware of.

This document describes the outgoing webhooks sent by RingCentral about the creation of incoming webhooks. 

## Incoming webhook event structure 

| Parameter | Type | Description |
|-|-|-|
| `eventType` | enum | Webhook event type which can be one of the following values: `WebhookCreated`, `WebhookUpdated`, `WebhookDeleted` | 
| `id` | string | ID of the webhook | 
| `creatorId` | string | ID of user whe created webhook | 
| `groupsId` | array | IDs of groups where webhook has been created |
| `creationTime` | string | Webhook creation time in ISO 8601 format | 
| `lastModifiedTime` | string | Webhook last update time in ISO 8601 format |
| `uri` | string | Public url to send webhook's payload to |
| `status` | enum | Current status of the webhook, one of `Active`, `Suspended` or `Deleted` |

## Event Payloads

### Incoming Webhook created

This event is emitted when webhook has been created.

```json
{
      "id": "1a7fc5f1-38b7-4c3b-8251-c3f1de5e5c68",
      "creatorId": "400130721008",
      "groupIds": [
        "59416582"
      ],
      "creationTime": "2018-01-25T10:40:23.748Z",
      "lastModifiedTime": "2018-01-25T10:40:23.748Z",
      "uri": "https://hooks.glip.com/webhook/v2/1a7fc5f1-38b7-4c3b-8251-c3f1de5e5c68",
      "status": "Active",
      "eventType": "WebhookCreated"
}
```

### Webhook updated

This event is emitted when webhook has been either activated or suspended.

```json
{
      "before": {
        "status": "Active"
      },
      "after": {
        "id": "1a7fc5f1-38b7-4c3b-8251-c3f1de5e5c68",
        "creatorId": "147459",
        "groupIds": [
          "59416582"
        ],
        "creationTime": "2018-01-25T10:40:23.748Z",
        "lastModifiedTime": "2018-01-25T10:40:23.748Z",
        "uri": "https://hooks.glip.com/webhook/v2/1a7fc5f1-38b7-4c3b-8251-c3f1de5e5c68",
        "status": "Suspended"
      },
      "eventType": "WebhookUpdated"
}
```

### Webhook deleted

This event is emitted when webhook has been deleted.

```json
{
      "id": "1a7fc5f1-38b7-4c3b-8251-c3f1de5e5c68",
      "creatorId": "400130721008",
      "groupIds": [
        "59416582"
      ],
      "creationTime": "2018-01-25T10:40:23.748Z",
      "lastModifiedTime": "2018-01-25T10:40:23.748Z",
      "uri": "https://hooks.glip.com/webhook/1a7fc5f1-38b7-4c3b-8251-c3f1de5e5c68",
      "status": "Deleted",
      "eventType": "WebhookDeleted"
}
```
