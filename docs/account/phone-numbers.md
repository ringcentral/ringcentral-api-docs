# Phone Numbers

One of the key functions of the RingCentral service is the ability to provision phone numbers. This includes assigning them to extensions and devices and configuring them according to the requirements of the business phone system. The Account API provides endpoints to discover phone numbers which belong to a particular account or any of its extensions.

## Phone number roles

Every phone number has a role, or "usage type." The following are the usage types in RingCentral (see the `usageType` property in the example below):

| Usage Type | Description |
|-|-|
| `MainCompanyNumber` | The first local or toll-free number that the company gets when creating an account. One main number per account is allowed. |
| `AdditionalCompanyNumber` | A local or toll-free number the company receives after getting a main company number. One additional number per account is allowed. If the account main number is toll-free, then the additional number can be only local, and vice versa. Accessible only for some brands and tiers. | 
| `CompanyNumber` | A local or a toll-free number associated with the overall account, not mapped to any particular extension (usually it is assigned to Auto-Receptionist). | 
| `DirectNumber` | The phone number mapped to the extension. | 
| `CompanyFaxNumber` | A dedicated company fax number. |
| `ForwardedNumber` | The external phone number which is configured to forward calls to the RingCentral account numbers (should be supported by service provider) and registered in the RingCentral account. |

## Phone number types

Phone numbers can be further classified according to the type of calls they can be used for (see the `type` property in examples below). Here is a table of all phone call types:

| Type | Description |
|-|-|
| `VoiceAndFax` | the phone number can accept voice and data (fax) calls. SMS is supported | 
| `VoiceOnly` | the phone number can accept voice calls only. SMS is supported | 
| `FaxOnly` | the phone number can accept only fax calls. SMS is NOT supported | 

## Features supported by a phone number

The features and capabilities associated with a phone number can vary. The `features` property contains a list of these features. Currently the following features could be returned (any combination) for a given number:

| Features | Description |
|-|-|
| `CallerId` | the phone number can be exposed as Caller ID for any outbound call |
| `SmsSender` | the phone number can be specified as sender number in outbound SMS messages |

## Get a list of account phone numbers

The example response below shows what is return when you use the [Get Account Phone Numbers endpoint](https://developers.ringcentral.com/api-reference/Phone-Numbers/listAccountPhoneNumbers) to fetch info about a specific phone number on the network. 

```json
{
   "uri": ".../account/159048008/extension/435068008/phone-number?page=1&perPage=100",
   "records": [
     {
         "id": 246715008,
         "phoneNumber": "18559105564",
         "paymentType": "TollFree",
         "type": "VoiceFax",
         "usageType": "CompanyNumber",
         "features": [ CallerId ]          
     }, 
     {
         "id": 359733008,
         "phoneNumber": "17869876543",
         "paymentType": "External",
         "usageType": "ForwardedNumber",
         "features": [ ]          
     },
     {
         "id": 723455008,
         "phoneNumber": "16503316252",
         "paymentType": "Local",
         "type": "VoiceOnly",
         "usageType": "DirectNumber",
         "features": [ CallerId, SmsSender ]          
       } ],
   "paging":    
   {
      "page": 1,
      "totalPages": 1,
      "perPage": 100,
      "totalElements": 3,
      "pageStart": 0,
      "pageEnd": 2
   },
   "navigation":    
   {
      "firstPage": {"uri": ".../account/159048008/extension/435068008/phone-number?page=1&perPage=100"},
      "lastPage": {"uri": "../account/159048008/extension/435068008/phone-number?page=1&perPage=100"}
   }
}
```

!!! note "Permissions"

    If the logged-in user under a particular account/extension is an "Administrator," then all the phone numbers without any limitations are returned.

    If the logged-in user is **not** an "Administrator:"

       * only Direct Numbers of other extensions are returned, even if numbers with the other usageType value are requested;
       * features set is not returned.

A user with administrator privileges can also retrieve the list of all phone numbers belonging to a given account using the following URI:

    GET /restapi/v1.0/account/{accountId}/phone-number

The result would be similar to the previous example. In addition, the server will return information about the extension each phone number is mapped to (if any).

