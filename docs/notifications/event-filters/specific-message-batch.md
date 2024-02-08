# Specific Message Batch Event

This event is triggered when a specific message batch changes in a material way. 

* Filter:  `/restapi/v1.0/account/{accountId}/a2p-sms/batches/{batchId}`
* Required permission: `ReadAccounts`
* Available since: 1.0.45 (Release 20.4)

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
{!> code-samples/events/specific-message-batch.json !}
```
