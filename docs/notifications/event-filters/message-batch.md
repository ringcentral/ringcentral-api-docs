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

## Event payload

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
{!> code-samples/events/message-batch.json !}
```
