# Extension Favorites Event

*Since 1.0.26 (Release 8.2)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite` enables notifications in case of extension favorite list changes.

The updated extension data is accessible by calling the [Get Favorite Contact List](https://developers.ringcentral.com/api-reference/External-Contacts/listFavoriteContacts) method.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadContacts` | Viewing user personal contacts |

## Extension Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |


## Example

```json
{
    "uuid": "8b5594e0-d659-4e25-b36b-980ad907ae55",
    "event": "/restapi/v1.0/account/~/extension/9141626004/favorite",
    "timestamp": "2016-03-17T14:36:08.302Z",
    "subscriptionId": "2242051f-2980-4612-84ab-2d25e2efce2c",
    "ownerId": "9141626004",
    "body": {
      "extensionId": "9141626004"
    }
}
```

