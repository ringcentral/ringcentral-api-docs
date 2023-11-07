# Extension Favorites Event

*Since 1.0.26 (Release 8.2)*

Event filter `/restapi/v1.0/account/{accountId}/extension/{extensionId}/favorite` enables notifications in case of extension favorite list changes.

The updated extension data is accessible by calling the [Get Favorite Contact List](https://developers.ringcentral.com/api-reference/External-Contacts/listFavoriteContacts) method.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadContacts` | Viewing user personal contacts |

## Event payload

| Parameter | Type | Description |
|-----------|------|-------------|
| `extensionId` | string | Internal identifier of an extension |


## Example

```json
{!> code-samples/events/extension-favorites.json !}
```

