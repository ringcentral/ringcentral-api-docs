# Receiving Faxes

In order to get the list of received faxes, use the `message-store` API endpoint with `direction=Inbound` and `messageType=Fax` query parameter:

```http
GET  /restapi/v1.0/account/~/extension/~/message-store?direction=Inbound&messageType=Fax
```

The API response will contain a list of fax messages paginated by 100 (records per page) received yesterday. Each fax can be retrieved as a single PDF file attachment that includes all pages sent by the sender:

```json
{
  "uri" : "https://platform.ringcentral.com/restapi/v1.0/account/230919004/extension/230919004/message-store?messageType=Fax&availability=Alive&dateFrom=2018-10-07T09:19:00.000Z&page=1&perPage=100",
  "records" : [ ... ,
    {
      "uri": "https://platform.ringcentral.com/restapi/v1.0/account/230919004/extension/230919004/message-store/5209304004",
      "id": 5209304004,
      "from": {
        "phoneNumber": "+12138887464"
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
      "subject": "+12135559976",
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

```json
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

```json
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
