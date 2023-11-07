# Extension DND Status Event

*Since 1.0.46 (Release 21.1)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/dnd` enables notifications in case of `dndStatus` change of the current extension.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

## Event payload

| Parameter | Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |
| `dndStatus` | 'TakeAllCalls' or 'DoNotAcceptAnyCalls' or 'DoNotAcceptDepartmentCalls' | Extended DnD (Do not Disturb) status |

## Example

```json
{!> code-samples/events/extension-dnd-status.json !}
```
