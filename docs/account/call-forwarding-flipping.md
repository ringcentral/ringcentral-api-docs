# Call Forwarding & Flipping

Every RingCentral [extension](../extensions) may have a list of phone numbers to which calls can be forwarded. A "forwarding number" is any external (non-RingCentral) or internal phone number/extension used for redirecting incoming calls. They are also used when connecting calls via the [RingOut API](../../voice/ringout/). Each user is able to specify ten forwarding numbers under the following 3 predefined labels:

* 'Home'
* 'Mobile'
* 'Office'

In addition, users can create up to seven custom labels (by changing the 'Other' label).

## Flipping calls

The Call Flip option transfers a call to another device while the call is active. RingCentral phone numbers with the provisioned phone devices and the external forwarding numbers specified by the user are available for the call flip option. They are automatically entered into the Call Flip list. They can then be prioritized and ordered within that list. Flipping a call to a specific phone is available by dialing a shortcut dial number, which is returned by the server in the `flipNumber` field.

The API allows retrieving forwarding and call flip numbers for a certain extension by the URI:

    GET /restapi/v1.0/account/{accountId}/extension/{extensionId}/forwarding-number

Below is a sample response.

```json
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
