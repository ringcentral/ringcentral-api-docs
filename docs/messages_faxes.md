# Faxes

## Sending a Fax

Faxes are a popular mechanism for sending files. There are two ways to send a fax, one using `multipart/form-data` and another using `multipart/mixed` described below -- the choice of which may depend on your API client. For more information on fax support, see the following resources:

* [API Reference](https://developers.ringcentral.com/api-reference#Fax-sendFaxMessage)
* [Developer FAQ](http://ringcentral-faq.readthedocs.io/en/latest/fax/)

### Send a Fax Using multipart/form-data

`multipart/form-data` is a popular approach for sending faxes because many HTTP client libraries support `multipart/form-data` natively due to the fact it is supported by web browsers.

#### Example Request

```http
POST /restapi/v1.0/account/11112222/extension/22223333/fax HTTP/1.1
Content-Type: multipart/form-data;boundary=Boundary_14_2952358_1361963763144
Authorization: Bearer MyToken

--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="coverPageText"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain


--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="coverIndex"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain

2
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="faxResolution"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain

High
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="sendTime"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain

2030-03-19T08:00:00.000Z
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="isoCode"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain

UK
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="to"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain

18001234567
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="to"; filename=""
Content-Transfer-Encoding: 8bit
Content-Type: text/plain

18001234568
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="attachment"; filename=""
Content-Transfer-Encoding: binary
Content-Type: text/plain

attachment0
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="attachment"; filename=""
Content-Transfer-Encoding: binary
Content-Type: text/plain

attachment1
--Boundary_14_2952358_1361963763144
Content-Disposition: form-data; name="attachment"; filename=""
Content-Transfer-Encoding: binary
Content-Type: text/plain

attachment2
--Boundary_14_2952358_1361963763144--
```

### Send a Fax Using multipart/mixed

`multipart/mixed` is more compact as shown below but is not supported natively by HTTP clients so either a RingCentral SDK or custom `multipart/mixed` code may be useful.

```http
POST /restapi/v1.0/account/11112222/extension/22223333/fax HTTP/1.1
Content-Type: multipart/mixed; boundary=Boundary_1_14413901_1361871080888
Authorization: Bearer MyToken

--Boundary_1_14413901_1361871080888
Content-Type: application/json

{"to":[{"phoneNumber":"18001234567"}],
 "faxResolution":"High",
 "sendTime":"2013-02-26T09:31:20.882Z"}

--Boundary_1_14413901_1361871080888
Content-Disposition: attachment; filename="fax.txt"

Hello, World!

--Boundary_1_14413901_1361871080888--
```

## Forwarding and Resending Faxes

With RingCentral, you can forward or resend a fax that has been previously sent through the system. In this case, the RingCentral API can use the fax message already stored on our servers so there is no need to send the message again. This can be useful for the following use cases:

1. forwarding a received inbound fax to another fax number
2. resending a fax that has not been received

The request takes a JSON body with the following parameters:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `originalMessageId` | `string` | yes | original message to be resent identifier |
| `to` | List of `CallerInfo` | no | resend the message to another recipient(s) |
| `sendTime` | `DateTime` | no | time to resend fax |

### Example Request

The request below shows the required `originalMessageId` property with the optional `to` and `sendTime` properties.

```http
POST /restapi/v1.0/account/11112222/extension/22223333/fax HTTP/1.1
Content-Type: application/json
Authorization: Bearer MyToken

{
  "originalMessageId": "12345678",
  "to": [ { "phoneNumber": "+15551234567" } ],
  "sendTime": "2016-12-01T00:00:00Z"
}
```

## Receiving Faxes

In order to get the list of received faxes, use the `message-store` API endpoint with `messageType = Fax` query parameter:

```http
GET  /restapi/v1.0/account/~/extension/~/message-store?messageType=Fax
```

The API response will contain a list of fax messages paginated by 100 (records per page) received yesterday:

```http
{
  "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/230919004/extension/230919004/message-store?messageType=Fax&availability=Alive&dateFrom=2018-10-07T09:19:00.000Z&page=1&perPage=100",
  "records" : [ ... ,
    {
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/230919004/extension/230919004/message-store/5209304004",
      "id": 5209304004,
      "from": {
        "phoneNumber": "+15555287464"
      },
      "type": "Fax",
      "creationTime": "2018-10-08T09:17:27.000Z",
      "readStatus": "Unread",
      "priority": "Normal",
      "attachments": [
        {
          "id": 5209304004,
          "uri": "https://media.ringcentral.com/restapi/v1.0/account/230919004/extension/230919004/message-store/5209304004/content/5209304004",
          "type": "RenderedDocument",
          "contentType": "application/pdf"
        }
      ],
      "direction": "Inbound",
      "availability": "Alive",
      "subject": "+15556009976",
      "messageStatus": "Received",
      "faxResolution": "High",
      "faxPageCount": 1,
      "lastModifiedTime": "2018-10-08T09:17:27.227Z"
    },
  ... ],
  "paging" : {
      "page" : 1,
      "totalPages" : 3,
      "perPage" : 100,
      "totalElements" : 274,
      "pageStart" : 0,
      "pageEnd" : 99
    },
    "navigation" : {
      "nextPage" : { "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/230919004/extension/230919004/message-store?messageType=Fax&availability=Alive&dateFrom=2018-10-07T08:56:00.000Z&page=2&perPage=100" },
      "firstPage" : { "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/230919004/extension/230919004/message-store?messageType=Fax&availability=Alive&dateFrom=2018-10-07T08:56:00.000Z&page=1&perPage=100" },
"lastPage" : { "uri" : "https://platform.devtest.ringcentral.com/restapi/v1.0/account/230919004/extension/230919004/message-store?messageType=Fax&availability=Alive&dateFrom=2018-10-07T08:56:00.000Z&page=3&perPage=100" }
    }  
```

Adjusting `dateFrom` and `dateTo` parameters you may get the messages for desired date range:
```http
GET  /restapi/v1.0/account/~/extension/~/message-store?messageType=Fax&dateFrom=2018-10-01&dateTo=2018-10-07
```

If you'd like to track all new messages (including fax) in your app, you can use the push notification feature. Subscribe using the specific message store event filter:
```http
POST /restapi/v1.0/subscription

{
  "eventFilters": [
    "/restapi/v1.0/account/~/extension/~/message-store"
  ],
  "deliveryMode": {
    "transportType": "WebHook",
    "address": "https://myapp.io/newmessage"
  }
}
```

Then when a new message is received/sent your server will get a request with a payload like:
```JSON
{
  "timestamp": "2018-10-07T12:05:00.408+0000",
  "uuid": "b11c9430-9687-4498-b12b-3fcb470bfe04",
  "event": "/restapi/v1.0/account/230919004/extension/230919004/message-store",
  "subscriptionId": "9d38419f-645f-4ee3-a053-8cf1368c21c4",
  "body": {
    "extensionId": 230919004,
    "lastUpdated": "2018-10-07T12:05:00.531+0000",
    "changes": [
      {
        "type": "Fax",
        "updatedCount": 0,
        "newCount": 1
      }
    ]
  }
}
```

As a reaction to this request, your server may poll the message store as described above to get the new message (messages) metadata. See also [Push Notifications](https://ringcentral-api-docs.readthedocs.io/en/latest/notifications_overview/) for more notification delivery options and [Message Sync](https://ringcentral-api-docs.readthedocs.io/en/latest/messages_sync/) for fine-tuned synchronization.