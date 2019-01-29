# Pager Messages

Pager messages are RingCentral specific types of text messages which can be sent between extensions of one account. Unlike SMS, pager messages can be sent to multiple recipients, so the API allows several extension numbers in the `to` field. Another difference from SMS is that the pager message that is sent to the department extension is automatically forwarded to all department members. This allows setting up dedicated mailing lists within the organization. The endpoint `company-pager` is designed to handle pager messages. The example below demonstrates sending new pager messages via the API.

```http
POST /restapi/v1.0/account/~/extension/~/company-pager HTTP/1.1
Content-Type: application/json
Content-Length: ACTUAL_CONTENT_LENGTH_HERE

{
"to": [{"extensionNumber": "102"}, 
       {"extensionNumber": "103"}],

"from": {"extensionNumber": "101"},
"text": "Hello!"
}
```

```http                                        
HTTP/1.1 200 OK
Content-Type: application/json

{
  "uri":".../account/1346632010/extension/1346632010/message-store/320272670010",
  "id":320272670010,
  "to":[
    {
      "extensionNumber":"101"
    },
    {
      "extensionNumber":"102"
    },
    {
      "extensionNumber":"103"
    }
  ],
  "from":{
    "extensionNumber":"101"
  },
  "type":"Pager",
  "creationTime":"2012-10-18T13:18:24.000Z",
  "readStatus":"Unread",
  "priority":"Normal",
  "attachments":[
    {
      "id":1,
      "uri":"http:.../restapi/v1.0/account/1346632010/extension/1346632010/message-store/320272670010/content/1",
      "contentType":"text/plain"
    }
  ],
  "direction":"Outbound",
  "availability":"Alive",
  "subject":"Hello!",
  "messageStatus":"Sent",
  "conversationId":320272670010,
  "lastModifiedTime":"2012-10-18T13:18:24.000Z",
  "pgToDepartment":false
}
```

## Pager Messaging Threads

The API supports pager messaging threads for the User extensions, including Department extensions. Those internal message conversations are not accessible for reading or writing by users which were removed from the explicit or implicit list of recipients in this conversation. For example, a user extension included in a Department extension is able to participate in the Department conversation, sending and receiving messages. Once this particular user is removed from the department, he/she is not able to reply to previous messages, nor send or receive new messages. It means that, when somebody posts a reply to a particular conversation (by indicating `replyOn` in API requests), the server checks if the user belongs to the actual list of recipients (implicitly, through Department membership, or explicitly). If the user does not belong to the recipient list, the server returns the 403 Forbidden error code with the appropriate logical code.
