#Message Attributes

The message metadata retrieved through the API contains various information. Some metadata properties are returned for each message, others depend on message type and direction. One of the most important fields is `status` which can hold the following values:

- `Received` — standard status for all inbound messages.

- `Queued` — status for outbound fax and SMS messages, meaning the message was queued for sending.

- `Sent` — status for all outbound messages, meaning the message was sent successfully.

- `SendingFailed` — status for outbound fax and SMS messages, meaning the sending attempt has failed.

- `Delivered` — status for outbound SMS messages, meaning the SMS was successfully delivered to the recipient's handset (not supported by the US mobile carriers).

- `DeliveryFailed` — status for outbound SMS messages, meaning the SMS was not delivered to the recipient's handset by some reason (not supported by the US mobile carriers).

Each message also has a `readStatus` property which may store `Read` or `Unread` value. This status indicates whether the user has already viewed or played a particular message. The convention is that whenever the application supplies the message content to the user, it should update `readStatus` accordingly.

Apart from common message attributes which can be returned for a message of any type, there are some specific properties which make sense only for particular types of messages. By convention such fields contain special prefixes in their names.

- `fax` — appears only in Fax messages; example: `faxResolution`

- `vm` — appears only in Voicemail messages; example: `vmDuration`

- `sms` — appears only in SMS messages; example: `smsDeliveryTime`

- `pg` — appears only in Pager messages; example: `pgToDepartment`

See the [API Reference](https://developers.ringcentral.com/api-docs/latest/index.html#!#MessageInfo) section for the full list of supported message attributes.


Let's consider the example request below. GET [Message Info](https://developers.ringcentral.com/api-docs/latest/index.html#!#MessageInfo) request allows retrieving the Message Info object. In the example below the message type is SMS. The other message types: Fax, Pager, Voicemail and Text are retrieved via the same request with the corresponding `type` value.

```  
GET /restapi/v1.0/account/~/extension/~/message-store/320272588010 HTTP/1.1
Accept: application/json               
                
HTTP/1.1 200 OK
Content-Type: application/json 

{
   "uri": ".../account/1346632010/extension/1346632010/message-store/320272588010",
   "id": 320272588010,
   "to": [{"phoneNumber": "18551003732"}],
   "from": {"phoneNumber": "18559100010"},
   "type": "SMS",
   "creationTime": "2012-10-18T10:40:31.000Z",
   "readStatus": "Unread",
   "priority": "Normal",
   "attachments": [   {
      "id": 1,
      "uri": ".../account/1346632010/extension/1346632010/message-store/320272588010/content/1",
      "contentType": "text/plain"
   }],
   "direction": "Outbound",
   "availability": "Alive",
   "subject": "Test SMS message from Platform server",
   "messageStatus": "Delivered",
   "smsDeliveryTime": "2012-10-18T10:40:42.000Z",
   "conversationId": 4178398077955743750,
   "lastModifiedTime": "2012-10-18T10:40:42.000Z"
} 
```