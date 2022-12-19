# Users and extensions

The term "extension" in RingCentral refers to both addressable phone lines within a company, as well as to users within the organization. The term is conflated due to the fact that every user within the system is assigned an extension, yet there are other specialized forms of extensions used for other purposes on the network, the most common example being a call queue. Call queues have an extension associated with them,but are obviously not associated with an individual user. 

## Extension Types

Each extension has a "type" that defines the capabilities of that extension. Here is a list of supported extension types. 

| Extension Type | Description |
|-|-|
| `User`             | A user's primary extension. | 
| `FaxUser`          | An extension that can be used for faxes only. | 
| `VirtualUser`      | An extension that can be used for placing calls and faxes only. | 
| `DigitalUser`      | An extension that be used for placing calls, faxes, and desk phones.  | 
| `Department`       | A department extension allows you to distribute calls to department member extensions based on the number of calls they’ve taken, how long they’ve waited to take a call or their experience. You may also have the calls distributed in random order. | 
| `TakeMessageOnly` (or Voicemail) | The Messages-Only Extension is one that is dedicated specifically to receive messages. All calls routed to this extension will automatically be directed to the extension's voicemail box. | 
| `AnnouncementOnly` | An Announcements-Only Extension is dedicated to play an announcement for your callers. Configuring this extension allows you to record a message that gets played each time a call comes into your phone system. | 
| `SharedLinesGroup` | A Shared Lines Group allows calls made to one phone number to be answered by multiple phone devices. Answered calls can be handed off to other phones sharing the same phone number. |
| `PagingOnlyGroup`  | A Paging Only group is a collection of paging devices and/or desk phones that can receive a paging call. It allows a business to make a real-time announcement to multiple desk phones and/or overhead paging devices. | 
| `IvrMenu`          | An IvrMenu extension is dedicated to an Auto-Receptionist. When called, a greeting is played and users will be able to navigate a system of menus. | 
| `ParkLocation`     | Park Locations allow a specific group of people to park a call in a private location that only specific individuals can pick up. |
| `ApplicationExtension` | | 

!!! info "What extensions are available to you?"
    Be aware that the extension types available to your organization will depend upon your current service plan. 

## Get a list of extensions

Below is an example response return when someone calls the [Get Extension API](https://developers.ringcentral.com/api-reference/Extensions/listExtensions) for their account. Each extensions returned contains the following information:

* Contact info (first/last names, email, etc)
* Extension number
* Extension type
* Status

```json
{
   "uri": ".../account/159048008/extension?page=1&perPage=100",
   "records": [
      {
         "uri": ".../account/159048008/extension/159048008",
         "id": 159048008,
         "extensionNumber": "101",
         "name": "John Smith",
         "type": "User",
         "status": "Enabled",
         "contact" : 
             { "firstName" : "John",
               "lastName"  : "Smith",
               "company" : "MyCompany Inc.",
               "email" : "john.smith@mycompany.com" }  
      },
      {
         "uri": ".../account/159048008/extension/1201056008",
         "id": 1201056008,
         "extensionNumber": "110",
         "name": "AO Ext",
         "type": "Announcement",
         "contact" : {
	     "company" : "MyCompany",
             "email" : "marie.moon@mycompany.com",
             "businessAddress" : {
                "country" : "USA", 
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
         "firstPage": {"uri": ".../account/159048008/extension?page=1"},
         "lastPage": {"uri": ".../account/159048008/extension?page=1"}
   }
}
```

## Retrieve a specific extension

It is also possible to [get the data about a particular extension](https://developers.ringcentral.com/api-reference/User-Settings/readExtension). As in case of an account ID, you can use tilde (`~`) to refer to the currently logged-in extension instead of specifying its numeric ID, as follows:

    GET /restapi/v1.0/account/~/extension/~ 

!!! info "System Extensions"
    Every RingCentral account has a special system extension. The user of this extension has full administrative rights for the given account. Due to internal reasons, the ID of a system extension is always the same as the ID of account itself.
