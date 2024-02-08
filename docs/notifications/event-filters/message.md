# Message Event

*Since 1.0.6 (Release 5.15)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store` enables notifications in case of:

* any new message creation;
* any message change in extension message store.

The updated message info is accessible by calling the Get Message List method.

**Please note:** To receive notifications on a certain message type (Fax/Voicemail/Pager/SMS) and/or direction (Inbound/Outbound) the following event filter should be specified `/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store?type={type}&direction={direction}`.

*For example* to recieve notifications on outbound fax event use the filter: `/restapi/v1.0/account/{accountId}/extension/{extensionId}/message-store?type=Fax&direction=Outbound`

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadMessages` | Viewing user messages |

## Event payload

| Parameter | Type | Description |
|-----------|------|-------------|
| `accountId` | string | Internal identifier of an account. Optional parameter |
| `extensionId` | string | Internal identifier of an extension. Optional parameter |
| `lastUpdated` | date-time | Datetime when the message was last modified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format including timezone, for example *2016-03-10T18:07:52.534Z* |
| `changes` | Message Changes | Message changes |

### Message Changes

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | 'Voicemail' or 'SMS' or 'Fax' or 'Pager' | Message type |
| `newCount` | integer | The number of new messages. Can be omitted if the value is zero |
| `updatedCount` | integer | The number of updated messages. Can be omitted if the value is zero |

## Example

```json
{!> code-samples/events/message.json !}
```
