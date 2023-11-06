# Message Batch Event

*Since 1.0.45 (Release 20.4)*

Event filter `/restapi/v1.0/account/{accountId}/a2p-sms/batches` enables notifications in case of any message batch change on the current account.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

## Query Parameters

| Parameter     | Type | Description |
|---------------|------|-------------|
| `from` | string | Notification is received if the message batch is sent from a specific number in E.164 format, e.g. +16505550100|

## Message Batch Event

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier of the message batch |
| `from` | string | Phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format from which the messages are going to be sent |
| `batchSize` | integer | Total number of messages in the accepted batch |
| `processedCount` | integer | Total number of messages currently processed in the batch |
| `lastModifiedTime` | string | Last time the batch was processed |
| `status` | 'Processing' or 'Completed' | Current status of a message batch |
| `creationTime` | string | The time at which the batch was created |


## Example

```json

{
  "uuid": "845056649859290279",
  "event": "/restapi/v1.0/account/405151939033/a2p-sms/batches",
  "subscriptionId": "8466621d-c21d-41e6-8656-9e45100eb9dd",
  "ownerId": "405151939033",
  "timestamp": "2021-05-26T04:15:54.394Z",
  "body": {
     "lastModifiedTime": "2021-05-26T04:15:54.011183Z",
     "cost": 0.07,
     "processedCount": 1,
     "creationTime": "2021-05-26T04:15:50.612950Z",
     "from": "+14089150788",
     "id": "b6f5610f-5ff1-4273-8a8d-e3742ba4e683",
     "batchSize": 1,
     "status": "Completed"
  }
}
```
