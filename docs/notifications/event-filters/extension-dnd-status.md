# Extension DND Status Event

*Since 1.0.46 (Release 21.1)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/presence/dnd` enables notifications in case of `dndStatus` change of the current extension.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

## DND Status Event

| Parameter | Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |
| `dndStatus` | 'TakeAllCalls' or 'DoNotAcceptAnyCalls' or 'DoNotAcceptDepartmentCalls' | Extended DnD (Do not Disturb) status |

## Example

```json
{
    "uuid": "045b81dc-9f73-4864-84de-08aa6324a7f5",
    "event": "/restapi/v1.0/account/6610372004/extension/6610372004/presence/dnd",
    "timestamp": "2021-02-18T09:37:24.597Z",
    "ownerId": "6610372004",
    "body": {
      "extensionId": "6610372004",
      "dndStatus": "TakeAllCalls"
    }
}
```
