# Sending Messages on RingCentral

A wide range of telecommunication tools are used by business today: cell phones, desk phones, laptops, PDAs, fax machines, voice mailboxes, etc. The RingCentral service functions as a unified messaging system and provides customers with a seamless interface to interact with various communication media. Using the API you can create applications enabled to work with all kinds of messages available to the RingCentral customers:

- *SMS* — text messages sent via standard SMS communication technology;

- *Fax* — facsimile messages sent via fax-rendering system;

- *Pager* — text messages sent from one extension to another within a single RingCentral account;

- *Voicemail* — audio messages recorded by the caller when the called party is temporary unavailable.

## The Unified Message Store

Every RingCentral extension has an assigned mailbox that is used to store all the incoming and outgoing messages for this extension. You can access all messages available for a certain extension via the unified message store endpoint. In addition, for convenience there are endpoints available for specific types of messages: SMS, Faxes and Pager messages.

Unified `message-store` endpoint allows:

- retrieving a list of messages filtered by a specific criteria from an extension mailbox;

- retrieving content and metadata of a message;

- changing the status of a message (read/unread);

- removing a message from an extension mailbox.

Dedicated `fax`, `sms` and `company-pager` endpoints allow working with messages of the particular type including creating and sending new messages out.

## Message Attributes

The message metadata retrieved through the API contains various information. Some metadata properties are returned for each message, others depend on message type and direction. One of the most important fields is `status` which can hold the following values:

| Status | Description |
|-|-|
| `Received` | standard status for all inbound messages. |
| `Queued` | status for outbound fax and SMS messages, meaning the message was queued for sending. |
| `Sent` | status for all outbound messages, meaning the message was sent successfully. |
| `SendingFailed` | status for outbound fax and SMS messages, meaning the sending attempt has failed. |
| `Delivered` | status for outbound SMS messages, meaning the SMS was successfully delivered to the recipient's handset (not supported by the US mobile carriers). | 
| `DeliveryFailed` | status for outbound SMS messages, meaning the SMS was not delivered to the recipient's handset by some reason (not supported by the US mobile carriers). |

Each message also has a `readStatus` property which may store `Read` or `Unread` value. This status indicates whether the user has already viewed or played a particular message. The convention is that whenever the application supplies the message content to the user, it should update `readStatus` accordingly.

Apart from common message attributes which can be returned for a message of any type, there are some specific properties which make sense only for particular types of messages. By convention such fields contain special prefixes in their names.

| Prefix | Description |
|-|-|
| `fax` | appears only in Fax messages; example: `faxResolution` |
| `vm` | appears only in Voicemail messages; example: `vmDuration` |
| `sms` | appears only in SMS messages; example: `smsDeliveryTime` |
| `pg` | appears only in Pager messages; example: `pgToDepartment` |

For example, the following attributes returned by the Message Store relate exclusively to voicemail messages:

* `vmTranscriptionStatus`
* `vmDuration`

See the [API Reference](https://developer.ringcentral.com/api-reference) section for the full list of supported message attributes.

Let's consider the example request below. GET [Message Info](https://developer.ringcentral.com/api-reference#SMS-and-MMS-loadMessage) request allows retrieving the Message Info object. In the example below the message type is SMS. The other message types: Fax, Pager, Voicemail and Text are retrieved via the same request with the corresponding `type` value.

```http tab="Response"
HTTP/1.1 200 OK
Content-Type: application/json 

{
   "uri": ".../account/1346632010/extension/1346632010/message-store/320272588010",
   "id": 320272588010,
   "to": [{"phoneNumber": "18555553732"}],
   "from": {"phoneNumber": "18555550010"},
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

```http tab="Request"
GET /restapi/v1.0/account/~/extension/~/message-store/320272588010 HTTP/1.1
Accept: application/json
```

## Message Availability and Life Cycle

Every outbound or inbound message is created in the system in alive state. This state is tracked using the `availability` property, which is returned as a part of message metadata, and contains the `Alive` value by default.

Once the message is deleted by the user, its availability is changed to `Deleted`, but it still remains in the extension mailbox and can be restored by the user.

After being `Deleted` for a certain time (by default, 5 days) the system erases message data (attachments) and automatically switches its availability to `Purged`. Purged messages cannot be restored but their metadata is stored in the system for some time (by default, 5 days). After that all information about such messages is physically removed from the system.

There is a separate constraint defining the maximum number of messages which can be stored in a mailbox. If this threshold is exceeded the system will delete some old messages automatically.

The user is able to filter out the messages by their availability. By default, unless a specific availability value is passed in the query, all message retrieval endpoints hide the deleted or purged messages.

