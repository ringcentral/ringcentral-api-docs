# Company Directory Event

*Since 1.0.32 (Release 9.3)*

Event filter `/restapi/v1.0/account/{accountId}/directory/entries` enables notifications in case of change of the following fields of a company directory contact entry:

* status
* firstName
* lastName
* name
* department
* email
* extensionNumber
* site
* etag
* adding/removal of a contact phone number

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number) |

## Contact Event

| Parameter | Type | Description |
|-----------|------|-------------|
| `id`      |string| Internal identifier of an extension |
| `eventType` | string | Type of change |
| `type` | string | Type of extension |
| `status` | 'Disabled' or 'Enabled' or 'NotActivated' | Status of an extension|
| `firstName`| string | First name of a user extension |
| `lastName` | string | Last name of a user extension |
| `name`     | string | Name of a contact, for non-user extensions|
| `department` | string | Department name  |
| `email` | string | Email of an extension user  |
| `extensionNumber` | string | Extension number  |
| `account`  | Account Info    | Account data of an extension|
| `phoneNumbers` | Collection of Phone Number Info | Extension phone numbers information |
| `site` | Site Info | Site data  |
| `profileImage`  | Profile Image Info | Extension profile image information. Not returned if profile images are absent for an extension  |

### Account Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` |string| Internal identifier of an account |


### Phone Number Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` |string| Extension phone number in [E.164](https://www.itu.int/rec/T-REC-E.164-201011-I) format  |
| `usageType` | 'MobileNumber' or 'ContactNumber' or 'DirectNumber' or 'ForwardedNumber' | Usage type of a phone number|
| `type` | 'VoiceOnly' or 'FaxOnly' or 'VoiceFax' | Type of a phone number|

### Site Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` |string| Internal identifier of a site. For Main Site the value is `main-site` |
| `name` | string | Custom name of a site |


### Profile Image Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `uri` |string| Link to a profile image resource |
| `etag` | string| Internal identifier of an image |


## Example

```json
{
  "uuid": "ed1cf00c-0420-4bf5-a0ae-e659cc9f77e0",
  "event": "/restapi/v1.0/account/400386146004/directory/entries",
  "timestamp": "2017-09-27T12:00:00.000Z",
  "subscriptionId": "3rtt23ryy-56665-t7r7-a0ae-748895yhhf94ujrr",
  "body": {
    "contacts": [{
        "eventType": "Update",
        "id": "8798797945",
        "type": "User",
        "status": "Enabled",
        "name": "John Smith",
        "firstName": "John",
        "lastName": "Smith",
        "department": "Sales",
        "email": "john.smith@example.com",
        "extensionNumber": "103",
        "account": {
          "id": "12345"
        },
        "phoneNumbers": [{
            "phoneNumber": "+12345672134",
      "usageType": "DirectNumber",
      "type": "VoiceFax"
          }
        ],
        "profileImage": {
          "etag": "a4cf0cfe3eff6c81b8c0bab7f3649502"
        },
  "site": {
    "id": "12345678",
          "name": "West branch"
  }
      }
    ]
  }
}
```
