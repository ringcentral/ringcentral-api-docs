# Contact Center Phone Number Event

*Since 1.0.43 (Release 20.2)*

Event filter `/restapi/v1.0/account/{accountId}/phone-number?usageType=ContactCenterNumber` enables notifications in case of any change related to Contact Center phone numbers. A change can be defined by the `usageType` filter with the following values:
*Created* - a new phone number is created its first assignment is "Contact Center";
*Deleted* - a Contact Center number is deleted;
*Updated* - the existing phone number (already assigned to any extension type) was converted to "Contact Center"; the existing phone number of 'Contact Center' type is reassigned to any other extension type.

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `ReadAccounts` | Viewing user account info (including name, business name, address and phone number/account number |

## Event payload

| Parameter | Type | Description |
|-----------|------|-------------|
| `eventType` | 'Created' or 'Updated' or 'Deleted' | Type of change |
| `phoneNumberInfo` | Phone Number Info | Information on a changed phone number |

### Phone Number Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `uri` | string | Link to a phone number resource |
| `id` | string | Internal identifier of a phone number |
| `phoneNumber` | string | Phone number in e.164 format |
| `paymentType` | string | Type of payment |
| `location` | string | Phone number location |
| `type` | 'Voice' or 'Fax' or 'VoiceFax' | Type of a number |
| `usageType` | 'ContactCenterNumber' | Phone number usage type |
| `status` | string | Phone number status |
| `contactCenterProvider` | Contact Center Provider Info | Information on a Contact Center Provider |


### Contact Center Provider Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of provider|
| `name` | string | Provider name |


## Example

```json
{!> code-samples/events/contact-center-phone-number.json !}
```
