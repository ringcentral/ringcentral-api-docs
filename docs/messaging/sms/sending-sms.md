# Sending an SMS

!!! warning "First time sending an SMS?"
    If you are new to RingCentral and are trying to send an SMS for the first time, we recommend you try our [SMS Quick Start Guide](../../quick-start/) available in multiple languages, and checking out our [SMS Best Practices Guide](../best-practices/).

SMS messages can be sent to or received from the handsets operated by most mobile carriers (all major US carriers are currently supported). Each SMS is a peer-to-peer message from one phone number to another. There is a special SMS API endpoint to create and send SMS messages.

```http tab="Request"
POST /restapi/v1.0/account/~/extension/~/sms HTTP/1.1
Content-Type: application/json   
Content-Length: ACTUAL_CONTENT_LENGTH_HERE

{
   "to": [{"phoneNumber": "14155550100"}],
   "from": {"phoneNumber": "16505550100"},
   "text": "Test SMS message"
}   
```

```http tab="Response"
HTTP/1.1 200 OK
Content-Type: application/json  

{
   "uri": ".../account/1346632010/extension/1346632010/message-store/320270670010",
   "id": 320270670010,
   "to": [{"phoneNumber": "14155553732"}],
   "from": {"phoneNumber": "16505550010"},
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

## Sending an SMS on Behalf of a Call Queue

Sending SMS messages on behalf of a [call queue](../../../voice/call-queues/) (`Department` type extension) is allowed. To send an SMS message from the Department direct phone number, the user should be logged in as the department manager (with department credentials). When requesting a phone number list for a Department extension type, SmsSender flag set for department numbers is returned.

## Sending an SMS to Disabled and Frozen Extensions

Sending SMS messages to Disabled and Frozen extension types is not allowed. When an SMS message is sent to a Disabled/Frozen extension, it is dropped. The dropped message is saved only in the sender's outbox.
