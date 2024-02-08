# Receiving Faxes

In order to get the list of received faxes, use the `message-store` API endpoint with `direction=Inbound` and `messageType=Fax` query parameter:

```http
GET  /restapi/v1.0/account/~/extension/~/message-store?direction=Inbound&messageType=Fax
```

The API response will contain a list of fax messages paginated by 100 (records per page) received yesterday. Each fax can be retrieved as a single PDF file attachment that includes all pages sent by the sender:

```json
{!> code-samples/messaging/receive-fax-payload.json !} 
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
{!> code-samples/messaging/receive-fax-event.json !} 
```

As a reaction to this request, your server may poll the message store as described above to get the new message (messages) metadata. See also [Push Notifications](../../notifications/index.md) for more notification delivery options and [Message Sync](../message-store/message-sync.md) for fine-tuned synchronization.
