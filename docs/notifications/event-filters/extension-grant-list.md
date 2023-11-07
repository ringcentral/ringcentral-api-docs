# Extension Grant List Event

*Since 1.0.15 (Release 7.0)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/grant` enables notifications in case of extension grant list changes.

The updated extension data is accessible by calling the [Get Extension Grant List](https://developers.ringcentral.com/api-reference#User-Settings-listExtensionGrants) method.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

## Event payload

| Parameter | Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |


## Example

```json
{!> code-samples/events/extension-grant-list.json !}
```

