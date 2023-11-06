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

## Message Event

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
{
   "timestamp": "2014-04-29T14:29:27.408+0000",
   "uuid": "b11c9430-9687-4498-b12b-3fcb470bfe04",
   "event": "/restapi/v1.0/account/~/extension/406149828004/message-store",
   "ownerId": "406149828004",
   "subscriptionId": "9d38419f-645f-4ee3-a053-8cf1368c21c4",
   "body": {
      "accountId": "406149828004",
      "extensionId": "406149828004",
      "lastUpdated": "2014-04-29T14:29:20.531+0000",
      "changes": [
                {
                  "type": "Pager",
                  "updatedCount": 1,
                  "newCount": 0
                }
                {
                  "type": "SMS",
                  "updatedCount": 0,
                  "newCount": 1
                },
                {...} ],
            },

 }
 ```
