# Batch Messages Event

*Since 1.0.45 (Release 20.4)*

Event filter `/restapi/v1.0/account/{accountId}/a2p-sms/messages` enables notifications in case of any message change in any batch on the current account.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

## Query Parameters

| Parameter     | Type | Description |
|---------------|------|-------------|
| `direction` | 'Inbound' or 'Outbound' | Specifies if notification is sent on inbound or outbound messages |
| `batchId`   | string | Notification is sent on inbound/outboud messages of the specific message batch |
| `from`      | string | Notification is sent on outbound messages from a specific phone number in E.164 format |
| `to`        | string | Notification is sent on inbound messages to a specific phone number in E.164 format |

## Batch Messages Event

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the message batch |
| `from` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format from which the messages are  sent |
| `to`   |string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format to which the messages are sent |
| `text` | string | Text of a message, maximum number of characters is 1000 |
| `creationTime` | string | The time at which the message was created |
| `lastModifiedTime` | string | The time when this message was last updated |
| `messageStatus` |'Queued' or 'Delivered' or 'Sent' or 'SendingFailed' or 'DeliveryFailed' |Current status of a message |
| `segmentCount`|integer | Number of segments of a message |
| `cost`| number | Cost of a message |
| `batchId` | string |The batch in which the message was submitted |
| `direction`| 'Inbound' or 'Outbound' | Indicates whether the message is outbound or inbound |
| `errorCode` | string | RC error code of the message sending failure reason |


## Example 1: Inbound Message

```json
{
  "uuid": "5496200236759723935",
  "event": "/restapi/v1.0/account/405156321033/a2p-sms/messages?direction=Inbound&to=+12406680432",
  "subscriptionId": "bce65879-8436-4b2b-a7ce-6ff15ed0ba20",
  "ownerId": "405156321033",
  "timestamp": "2021-05-26T04:16:43.533Z",
  "body":{
      "messageStatus": "Delivered",
      "lastModifiedTime": "2021-05-26T04:16:42.985974Z",
      "cost": 0.007,
      "creationTime": "2021-05-26T04:16:42.985974Z",
      "from": "+19287680662",
      "id": "7119",
      "to": ["+12406680432"],
      "text": "Thank you for the message",
      "segmentCount": 1,
      "direction": "Inbound"
  }
}
```

## Example 2: Outbound Message

```json
{
  "uuid": "3396141852418552739",
  "event": "/restapi/v1.0/account/405150459033/a2p-sms/messages?direction=Outbound&from=+13102375087",
  "subscriptionId": "417eaa6f-e2bd-4b37-adae-868de87d20e1",
  "ownerId": "405150459033",
  "timestamp": "2021-05-26T04:16:08.244Z",
  "body":{
      "messageStatus": "Delivered",
      "lastModifiedTime": "2021-05-26T04:16:08.107007Z",
      "cost": 0.007,
      "creationTime": "2021-05-26T04:16:05.442760Z",
      "from": "+13102375087",
      "id": "7086",
      "to": ["+14842910071"],
      "text": "Thank you for the message",
      "segmentCount": 1,
      "direction": "Outbound"
  }
}
```
