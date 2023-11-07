# Call Queue Member Presence Event

*Since 1.0.55 (Release 23.2)*

Event filter `/restapi/v1.0/account/{accountId}/call-queues/{groupId}/presence` enables notifications in case of any change of a presence status of a call queue member.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadPresence` | Getting user presence information |

## Event payload

| Parameter | Type | Description |
|-----------|------|-------------|
| `member` | Call Queue Member Info | Information about a call queue member |
| `acceptCurrentQueueCalls` | boolean | Call queue member presence status |

### Call Queue Member Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a call queue member|

## Example

```json
{!> code-samples/events/call-queue-member-presence.json !}
```
