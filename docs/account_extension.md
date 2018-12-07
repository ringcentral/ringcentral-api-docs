# Managing Phone Numbers, Extensions and Settings

The RingCentral service allows its customers to create and register an account that is usually associated with the customer's company. After registering the account with the company main number the user can create extensions of different types and functionality. The extensions can further be assigned with the phone numbers and phone devices.

The account and its extensions can be configured in accordance with the user demands.

Processing account and extensions requires certain permissions, different for each functionality. The permissions are listed so that each next includes the previous:

1. Retrieving account and extension data requires the "ReadAccounts" permission.

2. Modifying extension settings requires the "EditExtensions" permission.

3. Modifying account (including creating, modifying and deletion of extensions) requires the "EditAccounts" permission.

4. Creating new accounts requires the "Accounts" permission.

This chapter provides general information on account/extension and describes the way to retrieve it. The description of other functionality is given in detail in further chapters (corresponding to the permissions list).

A typical consumer application authenticates using credentials supplied by the RingCentral user to get access to the user's data. The application needs to know various details about the user account to function properly.

Through the API the following account settings can be read:

- Basic customer account information (main phone number, service plan, available features, etc.)

- The list of extensions and each extension details

- The list of assigned phone numbers (per extension or globally per account)

Common access control rules are based on user credentials and are enforced in API as follows:

- access is allowed only to the information related to the authenticated account;

- any user may access public information about the account and all information about their own extension;

- users with administrator rights may access all information about account and all of its extensions.

## Account and Extension Information

### Retrieving Account Data

RingCentral API allows to retrieve information about a particular account.

To retrieve the information about a particular account use the following request:

    GET /restapi/v1.0/account/{accountId}

You may provide either explicit accountId or use simplified syntax with tilde (~). The examples of request and response are provided below.

```
GET /restapi/v1.0/account/~ HTTP/1.1
Accept: application/json

HTTP/1.1 200 OK
Content-Type: application/json

{
  "uri" : "https.../restapi/v1.0/account/401145624008",
  "id" : 401145624008,
  "serviceInfo" : {
    "uri" : "https.../restapi/v1.0/account/401145624008/service-info",
    "brand" : {
      "id" : "1210",
      "name" : "MyCompany Inc.",
      "homeCountry" : {
        "id" : "1",
        "uri" : "https.../restapi/v1.0/dictionary/country/1"
      }
    },
    "servicePlan" : {
      "id" : "1216",
      "name" : "Professional"
    },
    "billingPlan" : {
      "id" : "159",
      "name" : "Monthly - 14.99 - Pro 101503",
      "durationUnit" : "Month",
      "duration" : 1,
      "type" : "Regular"
    }
  },
  "operator" : {
    "uri" : "https.../restapi/v1.0/account/401145624008/extension/401145624008",
    "id" : 401145624008,
    "extensionNumber" : "101"
  },
  "mainNumber" : "18555440014",
  "status" : "Confirmed"
}
```

### Retrieving Extension Data

The RingCentral API allows retrieval of information on extensions that belong to a particular account. All types of extensions are supported, namely:

- **User** ('User', 'FaxUser','VirtualUser', 'DigitalUser') extension

- **Department** extension

- **TakeMessageOnly** (or Voicemail) extension

- **AnnouncementOnly** extension

- **SharedLinesGroup** extension

- **PagingOnlyGroup** extension

- **IvrMenu** extension

- **ApplicationExtension** extension

- **ParkLocation** extension

Extension types supported for a particular account depend on the service plan the account is subscribed to. RingCentral accounts differ depending on a service plan (tier) that they are subscribed to. Currently all the service plans are divided into UBP (User Based Pricing) and non-UBP. Major RingCentral **non-UBP** service plans are: Fax, Professional and Office. The following extension types are supported for the accounts subscribed to these service plans: User, Department, Take Messages Only (Voicemail) and Announcement Only. Unlike non-UBP service plans, **UBP** assumes support for distinctive and chargeable user extension types: FaxUser (Fax Only), VirtualUser (Fax/Calling) and DigitalUser (Fax/Calling/Deskphones). The regular ‘User’ extension type is no longer supported for UBP service plans. In UBP service plans, non-chargeable Department, Take Message and Announcement Only extensions are still supported.

As in the case of account ID, it is possible to use tilde (~) to refer to the currently logged-in extension instead of specifying its numeric ID. Here is an example of the API call. Please note that the response contains navigation links and standard collection metadata on paging.

```
GET /restapi/v1.0/account/159048008/extension HTTP/1.1
Accept: application/json                
                

HTTP/1.1 200 OK
Content-Type: application/json               
{
   "uri": ".../account/159048008/extension?page=1&perPage=100"
   "records": [
      {
         "uri": ".../account/159048008/extension/159048008",
         "id": 159048008,
         "extensionNumber": "101",
         "name": "John Smith",
         "type": "User"
         "contact" : 
             { "firstName" : "John" 
               "lastName"  : "Smith"
               "company" : "MyCompany Inc."
               "email" : "john.smith@mycompany.com" }  
         "status": "Enabled"
        },
      {
         "uri": ".../account/159048008/extension/1201056008",
         "id": 1201056008,
         "extensionNumber": "110",
         "name": "AO Ext",
         "type": "Announcement"
         "contact" : 
             { "company" : "MyCompany"
               "email" : "marie.moon@mycompany.com"
               "businessAddress" : {
                  "country" : "USA" 
                  "city" : "Washington" }
      } ],
   "paging":    
      {
         "page": 1,
         "totalPages": 1,
         "perPage": 100,
         "totalElements": 2,
         "pageStart": 0,
         "pageEnd": 1
      },
   "navigation":    
      {
         "firstPage": {"uri": ".../account/159048008/extension?page=1},
         "lastPage": {"uri": ".../account/159048008/extension?page=1}
      }
}
```

It is also possible to get the data about a particular extension. As well as in case of an account ID, you can use tilde (~) to refer to a currently logged-in extension instead of specifying its numeric ID, as follows:

    GET /restapi/v1.0/account/~/extension/~ 

Please refer to [Extension Service Feature Info](https://developers.ringcentral.com/api-docs/latest/RefExtensionInfo.html#ExtensionServiceFeatureInfo) for more details.

---

**Note**

Every RingCentral account has a special system extension. The user of this extension has full administrative rights for the given account. Due to internal reasons, the ID of a system extension is always the same as the ID of account itself.

---

## Phone Numbers

One of the key functions of the RingCentral service is the ability to operate with phone numbers. This includes assigning them to extensions and devices and configuring them according to the requirements of the business phone system.

The API provides endpoints to discover phone numbers which belong to a particular account or any of its extensions.

Following are the phone number roles, or usage types (see `usageType` property in examples):

- `MainCompanyNumber` — the first local or toll-free number that the company gets when creating an account. One main number per account is allowed.

- `AdditionalCompanyNumber` — a local or toll-free number the company receives after getting a main company number. One additional number per account is allowed. If the account main number is toll-free, then the additional number can be only local, and vice versa. Accessible only for some brands and tiers.

- `CompanyNumber` — a local or a toll-free number associated with the overall account, not mapped to any particular extension (usually it is assigned to Auto-Receptionist).

- `DirectNumber` — the phone number mapped to the extension.

- `CompanyFaxNumber` — dedicated company fax number.

- `ForwardedNumber` — the external phone number which is configured to forward calls to the RingCentral account numbers (should be supported by service provider) and registered in the RingCentral account.

The phone numbers can be also qualified according to the type of calls they can be used for (see `type` property in examples below).

- `VoiceAndFax` — the phone number can accept voice and data (fax) calls. SMS is supported

- `VoiceOnly` — the phone number can accept voice calls only. SMS is supported

- `FaxOnly` — the phone number can accept only fax calls. SMS is NOT supported

Other useful information returned for each phone number is the set of supported features. Currently the following features could be returned (any combination) for a given number (see `features` property in examples below).

- `CallerId` — the phone number can be exposed as Caller ID for any outbound call

- `SmsSender` — the phone number can be specified as sender number in outbound SMS messages

---

**Important**

If the user logged-in under particular account/extension is Administrator, then all the phone numbers without any limitations are returned.
If logged-in user is **not** Administrator:
- only Direct Numbers of other extensions are returned, even if numbers with the other usageType value are requested;
- features set is not returned.

---

The example below shows how to get phone numbers which can be used by a particular extension user.

```
GET /restapi/v1.0/account/~/extension/~/phone-number HTTP/1.1
Accept: application/json                
                
HTTP/1.1 200 OK
Content-Type: application/json               
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

The user with administrator privileges can also retrieve the list of all phone numbers belonging to a given account using the following URI:

    GET /restapi/v1.0/account/{accountId}/phone-number

The result would be similar to the previous example. In addition, the server will return information about the extension each phone number is mapped to (if any).

## Call Forwarding & Call Flip

Each extension can have a list of numbers for forwarding the calls. A forwarding number is any external (non-RingCentral) phone number used for redirecting incoming RingCentral calls, as well as for the RingOut feature. The user is able to specify ten forwarding numbers under the following 3 predefined labels: 'Home', 'Mobile', 'Office', and 7 customized labels (by changing the 'Other' label); they are returned in the `label` field. It is possible to forward calls to other RingCentral user phones (including extension direct numbers).

The Call Flip option transfers a call to another device while the call is active. RingCentral numbers with the provisioned phone devices and the external forwarding numbers specified by the user are available for the call flip option. They are automatically entered into the Call Flip list and then can be prioritized and ordered. Call Flip to a certain phone is available by dialing a shortcut dial number, which is returned by the server in the `flipNumber` field.

The API allows retrieving forwarding and call flip numbers for a certain extension by the URI:

    GET /restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number

The example below shows how to get the forwarding/call flip numbers list of a particular extension user.

```
GET /restapi/v1.0/account/~/extension/~/forwarding-number HTTP/1.1
Accept: application/json
Authorization: Bearer U0pDMDFQMDFKV1MwMXwvOFNzrXIkPlOq4Asm8diElhjMeQ
HTTP/1.1 200 OK
Content-Type: application/json


  "uri" : "https:.../restapi/v1.0/account/400249137008/extension/400249137008/forwarding-number?page=1&perPage=100",
  "records" : [ {
    "phoneNumber" : "+17609410044",
    "label" : "John Smith Desk Phone",
    "features" : [ "CallFlip" ],
    "flipNumber" : "1"
  }, {
    "phoneNumber" : "+18559878944",
    "label" : "Work",
    "features" : [ "CallForwarding", "CallFlip" ],
    "flipNumber" : "2"
  }, {
    "phoneNumber" : "+14803960003",
    "label" : "Jane Smith Softphone",
    "features" : [ "CallFlip" ],
    "flipNumber" : "3"
  }, {
    "phoneNumber" : "+12078260027",
    "label" : "Other",
    "features" : [ "CallForwarding", "CallFlip" ],
    "flipNumber" : "4"
  } ],
  "paging" : {
    "page" : 1,
    "totalPages" : 1,
    "perPage" : 100,
    "totalElements" : 4,
    "pageStart" : 0,
    "pageEnd" : 3
  },
  "navigation" : {
    "firstPage" : {
      "uri" : "https:.../restapi/v1.0/account/400249137008/extension/400249137008/forwarding-number?page=1&perPage=100"
    },
    "lastPage" : {
      "uri" : "https:.../restapi/v1.0/account/400249137008/extension/400249137008/forwarding-number?page=1&perPage=100"
    }
  }
}
```
