# Extension Grant List Event

*Since 1.0.15 (Release 7.0)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/grant` enables notifications in case of extension grant list changes.

The updated extension data is accessible by calling the [Get Extension Grant List](https://developers.ringcentral.com/api-reference#User-Settings-listExtensionGrants) method.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

## Extension Grant List Event

| Parameter | Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |


## Example

```json
{
   "uuid":"ed1cf00c-0420-4bf5-a0ae-e659cc9f77e0",
   "event":"/restapi/v1.0/account/~/extension/8475874957/grant",
   "subscriptionId": "9d38419f-645f-4ee3-a053-8cf1368c21c4",
   "ownerId": "8475874957",
   "timestamp": "2015-02-24T12:00:00.000Z",
   "body":{
        "extensionId": "8475874957"
   }
}
```

