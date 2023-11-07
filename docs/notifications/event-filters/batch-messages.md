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

## Event payload

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
{!> code-samples/events/batch-messages-1.json !}
```

## Example 2: Outbound Message

```json
{!> code-samples/events/batch-messages-2.json !}
```
