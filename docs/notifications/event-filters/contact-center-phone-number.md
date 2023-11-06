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

## Contact Center Phone Number Event

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
{
   "uuid": "ed1cf00c-0420-4bf5-a0ae-e659cc9f77e0",
   "event": "/restapi/v1.0/account/{accountId}/phone-number?usageType=ContactCenterNumber",
   "timestamp": "2013-06-14T12:00:00.000Z",
   "subscriptionId": "9d38419f-645f-4ee3-a053-8cf1368c21c4",
   "ownerId": "8475874957",
   "body": {
      "eventType": "Created",
      "phoneNumberInfo": {
         "uri": "https://platform.ringcentral.com/restapi/v1.0/account/37439510/phone-number/987654321",
         "id": "987654321",
         "phoneNumber": "+12024999741",
         "paymentType": "Local",
         "location": "Washington, DC",
         "type": "VoiceFax",
         "usageType": "ContactCenterNumber",
         "status": "Normal",
         "contactCenterProvider": {
            "id": "12345",
            "name": "ProviderName"
         }
      }
   }
}
```
