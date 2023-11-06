# Call Queue Member Presence Event

*Since 1.0.55 (Release 23.2)*

Event filter `/restapi/v1.0/account/{accountId}/call-queues/{groupId}/presence` enables notifications in case of any change of a presence status of a call queue member.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadPresence` | Getting user presence information |

## Call Queue Member Presence Event

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
{ 
    "uuid":"ed1cf00c-0420-4bf5-a0ae-e659cc9f77e0",
    "event":"/restapi/v1.0/account/{accountId}/call-queues/{groupId}/presence",
    "timestamp": "2019-06-14T12:00:00.000Z",
    "subscriptionId":"3rtt23ryy-56665-t7r7-a0ae-748895yhhf94ujrr",
    "ownerId": "1500723004",
    "body":{
        "records": [
            {
                "member": {
                    "id": "411753183004"
                },
                "acceptCurrentQueueCalls": true
            },
            {
                "member": {
                    "id": "411753646416541"
                },
                "acceptCurrentQueueCalls": false
            }
        ]
    }
}
```
