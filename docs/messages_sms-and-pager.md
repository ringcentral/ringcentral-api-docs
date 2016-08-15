There are two types of short text messages supported by RingCentral: SMS and Pager.

SMS messages can be received by the extension types: User and Take Messages Only (Voicemail).

Pager messages can be received by the extension types: User, Take Messages Only (Voicemail) and Department.

SMS/pager message length limitation is 1000/1024 symbols encoded in 2 bytes in UTF-16. If a character is encoded in 4 bytes in UTF-16 it is treated as 2 characters, thus restricting the maximum message length to 500/512 symbols.

SMS messages can be sent out to or received from the handsets operated by most mobile carriers (all major US carriers are currently supported). Each SMS is a peer-to-peer message from one phone number to another. There is a special `sms` API endpoint to create and send SMS messages. See example below.

```
POST /restapi/v1.0/account/~/extension/~/sms HTTP/1.1
Content-Type: application/json   
Content-Length: ACTUAL_CONTENT_LENGTH_HERE

{
   "to": [{"phoneNumber": "14151003732"}],
   "from": {"phoneNumber": "16509100010"}, 
   "text": "Test SMS message"
}   

HTTP/1.1 200 OK
Content-Type: application/json  

{
   "uri": ".../account/1346632010/extension/1346632010/message-store/320270670010",
   "id": 320270670010,
   "to": [{"phoneNumber": "14151003732"}],
   "from": {"phoneNumber": "16509100010"},
   "type": "SMS",
   "creationTime": "2012-10-16T06:34:58.000Z",
   "readStatus": "Unread",
   "priority": "Normal",
   "attachments": [   {
      "id": 1,
      "uri": ".../account/1346632010/extension/1346632010/message-store/320270670010/content/1",
      "contentType": "text/plain"
   }],
   "direction": "Outbound",
   "availability": "Alive",
   "subject": "Test SMS message",
   "messageStatus": "Sent",
   "conversationId": 4178398077955743750,
   "lastModifiedTime": "2012-10-16T06:34:59.000Z"
}
```

Pager messages are RingCentral specific types of text messages which can be sent between extensions of one account. Unlike SMS, pager messages can be sent to multiple recipients, so the API allows several extension numbers in the `to` field. Another difference from SMS is that the pager message that is sent to the department extension is automatically forwarded to all department members. This allows setting up dedicated mailing lists within the organization. The endpoint `company-pager` is designed to handle pager messages. The example below demonstrates sending new pager messages via the API.

```
POST /restapi/v1.0/account/~/extension/~/company-pager HTTP/1.1
Content-Type: application/json
Content-Length: ACTUAL_CONTENT_LENGTH_HERE

{
"to": [{"extensionNumber": "102"}, 
       {"extensionNumber": "103"}],

"from": {"extensionNumber": "101"},
"text": "Hello!"
}
                                            
HTTP/1.1 200 OK
Content-Type: application/json

{
   "uri": ".../account/1346632010/extension/1346632010/message-store/320272670010",
   "id": 320272670010,
   "to":    [
      {"extensionNumber": "101"},
      {"extensionNumber": "102"},
      {"extensionNumber": "103"}
   ],
   "from": {"extensionNumber": "101"},
   "type": "Pager",
   "creationTime": "2012-10-18T13:18:24.000Z",
   "readStatus": "Unread",
   "priority": "Normal",
   "attachments": [   {
      "id": 1,
      "uri": "http:.../restapi/v1.0/account/1346632010/extension/1346632010/message-store/320272670010/content/1",
      "contentType": "text/plain"
   }],
   "direction": "Outbound",
   "availability": "Alive",
   "subject": "Hello!",
   "messageStatus": "Sent",
   "conversationId": 320272670010,
   "lastModifiedTime": "2012-10-18T13:18:24.000Z",
   "pgToDepartment": false
}
```

Sending SMS messages on behalf of Department extensions is allowed. To send an SMS message from the Department direct phone number, the user should be logged in as the department manager (with department credentials). When requesting a phone number list for a Department extension type, SmsSender flag set for department numbers is returned.

Sending pager messages on behalf of a Department is not allowed; in the case of such an attempt, the department manager is notified that sending pages is not allowed for the Department extension type.

Sending pager/SMS messages to Disabled and Frozen extension types is not allowed. When an SMS message is sent to a Disabled/Frozen extension, it is dropped. The dropped message is saved only in the sender's outbox. When the page is sent to a Disabled/Frozen extension or to the list of extensions containing at least one Disabled/Frozen extension, the server immediately responds with the `400 Bad Request` error code and the explanatory message. But if the page is sent to a Department extension list containing any Disabled/Frozen extensions, the error is not returned, and this pager message is received only by active extensions of the Department.

## Pager Messaging Threads

The API supports pager messaging threads for the User extensions, including Department extensions. Those internal message conversations are not accessible for reading or writing by users which were removed from the explicit or implicit list of recipients in this conversation. For example, a user extension included in a Department extension is able to participate in the Department conversation, sending and receiving messages. Once this particular user is removed from the department, he/she is not able to reply to previous messages, nor send or receive new messages. It means that, when somebody posts a reply to a particular conversation (by indicating `replyOn` in API requests), the server checks if the user belongs to the actual list of recipients (implicitly, through Department membership, or explicitly). If the user does not belong to the recipient list, the server returns the 403 Forbidden error code with the appropriate logical code.

