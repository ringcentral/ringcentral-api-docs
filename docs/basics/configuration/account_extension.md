# Managing Phone Numbers, Extensions and Settings

A RingCentral account or organization contains a company phone number, underneath which lives a number of extensions and phone numbers. Each phone number and extension can have associated with it different capabilities on the platform, and can be associated with different physical phone devices.

In this guide, you will learn how to manage the phone numbers and extensions within your account, and configure them to meet the needs of your use case. 

## Using the Account API

The Account API enables developers to access the following account settings:

* Basic customer account information (main phone number, service plan, available features, etc.)
* The list of extensions in the account
* Details relating to each extension in the account
* The list of assigned phone numbers in the account (per extension or globally per account)

Some limits may be placed upon your ability to access and modify this information depending upon the authenticated user making the request. Common access control rules are as follows:

* access is allowed only to the information related to the authenticated account;
* any user may access public information about the account;
* any user may access all the information about their own extension;
* only users with administrator rights may access all information about account and all of its extensions.

### Required App Permissions

What actions you are allowed to perform via the API will depend upon the permissions granted to your application when it was initially setup. Here are the app permissions relevant to managing phone numbers and extensions:

| Permission | Description |
|-|-|
| `ReadAccounts` | Enables retrieving account and extension data. |
| `EditExtensions` | Enables modifying extension settings and everything under `ReadAccounts`. |
| `EditAccounts` | Enables modifying account settings, including creating, modifying and deletion of extensions, and everything under `EditExtensions`. | 
| `Accounts` | Enables the creating of new accounts and everything under `EditAccounts`. |

## Retrieving Account Data

The RingCentral Account API allows one to retrieve information about a particular account, such as your billing information, your service plan, your company's main phone number, etc. One can retrieve this information using the following request:

    GET /restapi/v1.0/account/{accountId}

One may provide either explicit `accountId` or use the simplified syntax of a tilde (`~`). A tilde instructs RingCentral to use the account id associated with the current authentication context. For example:

```http tab="Response"
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

```http tab="Request"
GET /restapi/v1.0/account/~ HTTP/1.1
Accept: application/json
```

## Retrieving Extension Data

The RingCentral Account API also allows for the retrieval of information on extensions that belong to a particular account.

### Extension Types

Each extension has a "type" that defines the capabilities of that extension. Here is a list of supported extension types. 

| Extension Type | Description |
|-|-|
| **User** | A user's primary extension. | 
| **FaxUser** | An extension that can be used for faxes only. | 
| **VirtualUser** | An extension that can be used for placing calls and faxes only. | 
| **DigitalUser** | An extension that be used for placing calls, faxes, and desk phones.  | 
| **Department** | A department extension allows you to distribute calls to department member extensions based on the number of calls they’ve taken, how long they’ve waited to take a call or their experience. You may also have the calls distributed in random order. | 
| **TakeMessageOnly** (or Voicemail) | The Messages-Only Extension is one that is dedicated specifically to receive messages. All calls routed to this extension will automatically be directed to the extension's voicemail box. | 
| **AnnouncementOnly** | An Announcements-Only Extension is dedicated to play an announcement for your callers. Configuring this extension allows you to record a message that gets played each time a call comes into your phone system. | 
| **SharedLinesGroup** | A Shared Lines Group allows calls made to one phone number to be answered by multiple phone devices. Answered calls can be handed off to other phones sharing the same phone number. |
| **PagingOnlyGroup** | A Paging Only group is a collection of paging devices and/or desk phones that can receive a paging call. It allows a business to make a real-time announcement to multiple desk phones and/or overhead paging devices. | 
| **IvrMenu** | An IvrMenu extension is dedicated to an Auto-Receptionist. When called, a greeting is played and users will be able to navigate a system of menus. | 
| **ParkLocation** | Park Locations allow a specific group of people to park a call in a private location that only specific individuals can pick up. |
| **ApplicationExtension** | | 

!!! info "What extensions are available to you?"
    Be aware that the extension types available to your organization will depend upon your current service plan. 

### Getting a list of extensions

Here is an example request and response where one is retrieving a list of extensions in an account. 

```http tab="Response"
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
         "type": "User",
         "status": "Enabled",
         "contact" : 
             { "firstName" : "John" 
               "lastName"  : "Smith"
               "company" : "MyCompany Inc."
               "email" : "john.smith@mycompany.com" }  
      },
      {
         "uri": ".../account/159048008/extension/1201056008",
         "id": 1201056008,
         "extensionNumber": "110",
         "name": "AO Ext",
         "type": "Announcement"
         "contact" : {
	     "company" : "MyCompany"
             "email" : "marie.moon@mycompany.com"
             "businessAddress" : {
                "country" : "USA" 
                "city" : "Washington" }
         }
      }
   ],
   "paging": {
         "page": 1,
         "totalPages": 1,
         "perPage": 100,
         "totalElements": 2,
         "pageStart": 0,
         "pageEnd": 1
   },
   "navigation": {
         "firstPage": {"uri": ".../account/159048008/extension?page=1},
         "lastPage": {"uri": ".../account/159048008/extension?page=1}
   }
}
```

```http tab="Request"
GET /restapi/v1.0/account/159048008/extension HTTP/1.1
Accept: application/json                
```                

### Retrieving a specific extension

It is also possible to get the data about a particular extension. As in case of an account ID, you can use tilde (`~`) to refer to the currently logged-in extension instead of specifying its numeric ID, as follows:

    GET /restapi/v1.0/account/~/extension/~ 

Please refer to [Extension Service Feature Info](https://developers.ringcentral.com/api-docs/latest/RefExtensionInfo.html#ExtensionServiceFeatureInfo) for more details.

!!! info "System Extensions"
    Every RingCentral account has a special system extension. The user of this extension has full administrative rights for the given account. Due to internal reasons, the ID of a system extension is always the same as the ID of account itself.

## Phone Numbers

One of the key functions of the RingCentral service is the ability to provision phone numbers. This includes assigning them to extensions and devices and configuring them according to the requirements of the business phone system. The Account API provides endpoints to discover phone numbers which belong to a particular account or any of its extensions.

### Roles

Every phone number has a role, or "usage type." The following are the usage types in RingCentral (see the `usageType` property in the example below):

| Usage Type | Description |
|-|-|
| `MainCompanyNumber` | The first local or toll-free number that the company gets when creating an account. One main number per account is allowed. |
| `AdditionalCompanyNumber` | A local or toll-free number the company receives after getting a main company number. One additional number per account is allowed. If the account main number is toll-free, then the additional number can be only local, and vice versa. Accessible only for some brands and tiers. | 
| `CompanyNumber` | A local or a toll-free number associated with the overall account, not mapped to any particular extension (usually it is assigned to Auto-Receptionist). | 
| `DirectNumber` | The phone number mapped to the extension. | 
| `CompanyFaxNumber` | A dedicated company fax number. |
| `ForwardedNumber` | The external phone number which is configured to forward calls to the RingCentral account numbers (should be supported by service provider) and registered in the RingCentral account. |

### Phone Call Types

Phone numbers can be further classified according to the type of calls they can be used for (see the `type` property in examples below). Here is a table of all phone call types:

| Type | Description |
|-|-|
| `VoiceAndFax` | the phone number can accept voice and data (fax) calls. SMS is supported | 
| `VoiceOnly` | the phone number can accept voice calls only. SMS is supported | 
| `FaxOnly` | the phone number can accept only fax calls. SMS is NOT supported | 

### Supported Features

The features and capabilities associated with a phone number can vary. The `features` property contains a list of these features. Currently the following features could be returned (any combination) for a given number:

| Features | Description |
|-|-|
| `CallerId` | the phone number can be exposed as Caller ID for any outbound call |
| `SmsSender` | the phone number can be specified as sender number in outbound SMS messages |

!!! note "Permissions"

    If the logged-in user under a particular account/extension is an "Administrator," then all the phone numbers without any limitations are returned.

    If the logged-in user is **not** an "Administrator:"

       * only Direct Numbers of other extensions are returned, even if numbers with the other usageType value are requested;
       * features set is not returned.

The example below shows how to get phone numbers which can be used by a particular extension user.

```http tab="Response"
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

```http tab="Request"
GET /restapi/v1.0/account/~/extension/~/phone-number HTTP/1.1
Accept: application/json                
```

The user with administrator privileges can also retrieve the list of all phone numbers belonging to a given account using the following URI:

    GET /restapi/v1.0/account/{accountId}/phone-number

The result would be similar to the previous example. In addition, the server will return information about the extension each phone number is mapped to (if any).

## Call Forwarding & Flipping

Each extension can have a list of numbers to which calls will be forwarded. A forwarding number is any external (non-RingCentral) or internal phone number/extension used for redirecting incoming RingCentral calls, as well as for the RingOut feature. Each user is able to specify ten forwarding numbers under the following 3 predefined labels: 'Home', 'Mobile', 'Office', and 7 customized labels (by changing the 'Other' label); they are returned in the `label` field.

The Call Flip option transfers a call to another device while the call is active. RingCentral numbers with the provisioned phone devices and the external forwarding numbers specified by the user are available for the call flip option. They are automatically entered into the Call Flip list and then can be prioritized and ordered. Call Flip to a certain phone is available by dialing a shortcut dial number, which is returned by the server in the `flipNumber` field.

The API allows retrieving forwarding and call flip numbers for a certain extension by the URI:

    GET /restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number

The example below shows how to get the forwarding/call flip numbers list of a particular extension user.

```http tab="Response"
HTTP/1.1 200 OK
Content-Type: application/json

{
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

```http tab="Request"
GET /restapi/v1.0/account/~/extension/~/forwarding-number HTTP/1.1
Accept: application/json
Authorization: Bearer U0pDMDFQMDFKV1MwMXwvOFNzrXIkPlOq4Asm8diElhjMeQ
```

