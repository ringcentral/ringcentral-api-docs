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

## Event payload

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
{!> code-samples/events/company-directory.json !}
```
