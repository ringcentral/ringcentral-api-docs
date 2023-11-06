# Extension Presence Line Event

*Since 1.0.16 (Release 7.1)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/line` enables notifications in case of change of presence of extension(s) monitored by the current extension.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadPresence` | Getting user presence information |

## Presence Line Event

| Parameter	| Type | Description |
|-----------|------|-------------|
| `extension` | Extension Info | Extension information |
| `sequence` | integer | Order number of a notification to state the chronology |

## Extension Info

| Parameter	| Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of an extension  |
| `id` | string | Internal identifier of a returned line  |

## Example

```json
{
     "timestamp": "2014-04-29T13:23:12.468+0000",
     "uuid": "a295fa1f-af6a-4518-b333-acf091bdd7ea",
     "event": "/restapi/v1.0/account/~/extension/406149828004/presence/line",
     "subscriptionId": "9d38419f-645f-4ee3-a053-8cf1368c21c4",
     "ownerId": "406149828004",
     "body": {
        "extension":
            [{
            "id": "677628004765"
              },
             {
            "id": "3"
           }],

         "sequence": 2698
           }
}
```
