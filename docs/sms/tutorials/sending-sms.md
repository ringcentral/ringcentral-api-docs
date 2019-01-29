# Sending an SMS

SMS messages can be sent out to or received from the handsets operated by most mobile carriers (all major US carriers are currently supported). Each SMS is a peer-to-peer message from one phone number to another. There is a special sms API endpoint to create and send SMS messages. See example below.

**Sample Request**

```http
POST /restapi/v1.0/account/~/extension/~/sms HTTP/1.1
Content-Type: application/json   
Content-Length: ACTUAL_CONTENT_LENGTH_HERE

{
   "to": [{"phoneNumber": "14151003732"}],
   "from": {"phoneNumber": "16509100010"}, 
   "text": "Test SMS message"
}   
```
**Sample Response**

```http
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

## Sending on Behalf of Call Queues

Sending SMS messages on behalf of call queues (`Department` type extension) is allowed. To send an SMS message from the Department direct phone number, the user should be logged in as the department manager (with department credentials). When requesting a phone number list for a Department extension type, SmsSender flag set for department numbers is returned.

Sending pager messages on behalf of a Department is not allowed; in the case of such an attempt, the department manager is notified that sending pages is not allowed for the Department extension type.

## Disabled and Frozen Exensions

Sending pager/SMS messages to Disabled and Frozen extension types is not allowed. When an SMS message is sent to a Disabled/Frozen extension, it is dropped. The dropped message is saved only in the sender's outbox. When the page is sent to a Disabled/Frozen extension or to the list of extensions containing at least one Disabled/Frozen extension, the server immediately responds with the `400 Bad Request` error code and the explanatory message. But if the page is sent to a Department extension list containing any Disabled/Frozen extensions, the error is not returned, and this pager message is received only by active extensions of the Department.

