# Emergency Address Event

*Since 1.0.43 (Release 20.2)*

Event filter `/restapi/v1.0/account/{accountId}/device/{deviceId}/emergency-address` enables notifications in case of change of device emergency address.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number |

## Event payload

| Parameter | Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |
| `deviceId` | string | Internal identifier of a device |


## Example

```json
{!> code-samples/events/emergency-address.json !}
```

