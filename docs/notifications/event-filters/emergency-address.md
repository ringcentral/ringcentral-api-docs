# Emergency Address Event

*Since 1.0.43 (Release 20.2)*

Event filter `/restapi/v1.0/account/{accountId}/device/{deviceId}/emergency-address` enables notifications in case of change of device emergency address.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number |

## Emergency Address Event

| Parameter | Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |
| `deviceId` | string | Internal identifier of a device |


## Example

```json
{
   "uuid":"ed1cf00c-0420-4bf5-a0ae-e659cc9f77e0",
   "event":"/restapi/v1.0/account/~/device/8475874957/emergency-address",
   "timestamp": "2020-01-14T12:00:00.000Z",
   "subscriptionId": "9d38419f-645f-4ee3-a053-8cf1368c21c4",
   "ownerId": "12311555413",
   "body":{
        "extensionId": "12311555413",
        "deviceId": "8475874957"
   }
}
```

