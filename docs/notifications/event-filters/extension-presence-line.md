# Extension Presence Line Event

*Since 1.0.16 (Release 7.1)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/line` enables notifications in case of change of presence of extension(s) monitored by the current extension.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadPresence` | Getting user presence information |

## Event payload

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
{!> code-samples/events/extension-presence-line.json !}
```
