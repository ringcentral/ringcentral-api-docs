A wide range of telecommunication tools are used by business today: cell phones, desk phones, laptops, PDAs, fax machines, voice mailboxes, etc. the RingCentral service functions as a unified messaging system and provides customers with a seamless interface to interact with various communication media. Using the API you can create applications enabled to work with all kinds of messages available to the RingCentral customers:

- *SMS* — text messages sent via standard SMS communication technology;

- *Fax* — facsimile messages sent via fax-rendering system;

- *Pager* — text messages sent from one extension to another within a single RingCentral account;

- *Voicemail* — audio messages recorded by the caller when the called party is temporary unavailable.

Every RingCentral extension has an assigned mailbox that is used to store all the incoming and outgoing messages for this extension. You can access all messages available for a certain extension via the unified message store endpoint. In addition, for convenience there are endpoints available for specific types of messages: SMS, Faxes and Pager messages.

Unified `message-store` endpoint allows:

- retrieving a list of messages filtered by a specific criteria from an extension mailbox;

- retrieving content and metadata of a message;

- changing the status of a message (read/unread);

- removing a message from an extension mailbox.

Dedicated `fax`, `sms` and `company-pager` endpoints allow working with messages of the particular type including creating and sending new messages out.

# Message Attributes

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

# Message Availability and Life Cycle

Every outbound or inbound message is created in the system in alive state. This state is tracked using the `availability` property, which is returned as a part of message metadata, and contains the `Alive` value by default.

Once the message is deleted by the user, its availability is changed to `Deleted`, but it still remains in the extension mailbox and can be restored by the user.

After being `Deleted` for a certain time (by default, 5 days) the system erases message data (attachments) and automatically switches its availability to `Purged`. Purged messages cannot be restored but their metadata is stored in the system for some time (by default, 5 days). After that all information about such messages is physically removed from the system.

There is a separate constraint defining the maximum number of messages which can be stored in a mailbox. If this threshold is exceeded the system will delete some old messages automatically.

The user is able to filter out the messages by their availability. By default, unless a specific availability value is passed in the query, all message retrieval endpoints hide the deleted or purged messages.

# SMS and Pager Messages

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

# Fax

Faxes are a popular communication mechanism for sending files supported by RingCentral.

There are two ways send faxes, one using `multipart/form-data` and another using `multipart/mixed` described below, the choice of which may depend on your API client.

For more information on fax support, see the following resources:

* [Developer Guide](https://developer.ringcentral.com/api-docs/latest/index.html#!#RefFaxMessages.html)
* [Developer FAQ](http://ringcentral-faq.readthedocs.io/en/latest/fax/)

## Send fax using multipart/form-data

`multipart/form-data` is a popular approach for sending faxes because many HTTP client libraries support `multipart/form-data` natively due to the fact it is supported by web browsers.

### Example Request

```bash
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

## Send fax using multipart/mixed

`multipart/mixed` is more compact as shown below but is not supported natively by HTTP clients so either a RingCentral SDK or custom `multipart/mixed` code may be useful.

```bash
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

# Message Synchronization

We have already considered Message Store which allows to send ad-hoc request to create, retrieve, update or delete messages. But in a real world it is often necessary to solve more sophisticated problems. For example, one of the typical usage scenarios in respect to messaging is synchronization of local (i.e. cached on client side) mailbox representation with the server. Let's take a look on the basic steps of such scenario.

When a client application logs in for the first time, it retrieves all the messages (variant: top N most recent ones, or messages for the last day/3 days/week/etc.) from server and caches them locally. In most cases it is reasonable to transfer not all but only basic information about messages (for example, message "headers" or metadata).

Application user is allowed to go through message list, open them (which may require separate request to server to download full message content), update their status and delete them.

Application checks server for updates periodically or upon user's request. In case of any changes on server (i.e. new messages or updates/removals) local representation is also updated. 

User may be allowed also to view "older" messages. In this case application downloads them from server and starts to listen for changes in them.

In order to simplify development of such applications RingCentral provides Message Synchronization API (or Message Sync API).

## How it works

First of all we need to describe some basic terms.

-   **Sync Frame** — the range of messages (possibly restricted by some filters) which are synchronized between client and server. Usually Sync Frame is defined by creationDate range plus additional filters like message type, direction, etc.

    Examples of Sync Frames:

    - inbound faxes received from Feb 25,12:00 till Feb 26, 12:00

    - outbound SMS messages sent from Feb 25,12:00 till now ("open" sync frame)

-   **Sync Type** — type of synchronization action, one of the following:

    - **Full Sync (FSYNC)** — retrieval of all messages satisfying client criteria (i.e. all incoming SMS messages within the last day). FSYNC request defines initial Sync Frame and produces first Sync Token (see below) for subsequent flow.

    - **Incremental Sync (ISYNC)** — retrieval of messages which have been changed since last Full or Incremental Sync. Client has to provide previously returned Sync Token which contains all the information about Sync Frame.

-   **Sync Token** – special token which is included in FSYNC/ISYNC response and has to be included in next ISYNC request. It allows server to understand which mailbox state is currently known to the client and respond with changes accordingly. Sync Token is generated according to the following principles:

    - it includes the datetime of last synchronization;

    - it includes the definition of current Sync Frame (set of filters);

    - it does not include record count;

    - it is encrypted in some way to hide implementation details from client.

Working with Message Sync API could be illustrated by the following example which can be mapped to scenario described above.

1. Application sends FSYNC request to server indicating required time frame and criteria. Server responds with message data (headers) and Sync Token.

2. When user wants to open, update or delete some of the messages loaded application does it through regular Message Store API using message ID(s).

3. If user presses "Refresh" button, application sends ISYNC request to server (providing Sync Token returned previously) and gets back new or updated messages, as well as indicator that some messages were removed from server. Application may be also configured to poll server with ISYNC requests periodically in background.

4. If user presses "More messages" button, application sends ISYNC request to server but also expands Sync Frame by providing new desired range of messages.

---

**Note**

In order to avoid message loss all sync requests are handled with overlapping of time periods. When handling request from the client, the server has to return records from the ISync time + Delta, where Delta is 5 sec.

---

**Note**

Message Sync API supports only retrieval operations. Creation of new messages and all updates should go through regular Message Store API.

---

## FSYNC Request

Initial Full Sync request to retrieve all voicemail messages since Feb 25th may look as follows.

Sync Frame with fixed start date and open end date:

    GET /restapi/v1.0/account/~/extension/~/message-sync?syncType=FSync&messageType=VoiceMail&dateFrom=2012-02-25

Sync Frame with fixed start date and end date:

    GET /restapi/v1.0/account/~/extension/~/message-sync?syncType=FSync&messageType=VoiceMail&dateFrom=2012-02-25T00:00:00&dateTo=2012-02-26T00:00:00

Sync Frame with fixed number of records:

    GET /restapi/v1.0/account/~/extension/~/message-sync?syncType=FSync&messageType=VoiceMail&recordCount=20

The following parameters are generally allowed in request:

- **syncType** — (mandatory) 'FSync' for Full Sync request;

- **messageType** — types of messages to be retrieved (see Message Store API for details). If none is specified, then messages of all types are retrieved.

- **direction** — 'Inbound' or 'Outbound' messages to be synchronized.

- **dateFrom**, **dateTo** — defines the time range of SyncFrame. If dateTo is omitted, the server returns messages created by current time. If dateFrom is omitted, the server returns messages one week older than dateTo.

- **recordCount** — additionally limits the number of records to be returned (if specified, works in combination with dateFrom and dateTo).

---

**Note**

Due to implementation specifics, the server cannot guarantee the exact number of records that is specified in recordCount parameter. So the client application should be ready to get more records than it is requested in some rare cases.

---

The corresponding response from server will be:

```
{
   "uri": "https://.../message-sync?messageType=VoiceMail&syncType=FSync&dateFrom=2012-02-25T00:00:00.000Z",
             "records":    [
      {
         "uri": "https://.../message-store/308833278010",  "id": 308833278010,
         "to": [{"contact": {"name": "John
            Smith"}}],
         "from": {"contact": {"name": "Jane Smith"}},
         "type": "VoiceMail",
         "creationTime": "2012-08-08T12:17:28.000Z",
         "readStatus": "Unread",
         "priority": "Normal",
         "attachments": [         {
            "id": 1,
            "uri": "http://.../message-store/308833278010/content/1",  "contentType": "audio/x-wav",
            "vmDuration": 42
         }],
         "direction": "Inbound",
         "availability": "Alive",
         "subject": "Message",
         "messageStatus": "Received",
         "lastModifiedTime": "2012-08-08T12:17:28.000Z"
      }
   ],
   "syncInfo":    {
      "syncType": "FSync",
      "syncToken": "AAAAAv8AAAE1sc6UAP_______________wAAATlo9mWw",
      "syncTime": "2012-08-27T16:42:22.000Z"
   }
}
```

Sync Token to be used in subsequent request is returned as a part of syncInfo structure (see the bottom of code example above).

---

**Note**

Message Sync API requests do not support paging as other APIs since it is not applicable for synchronization use cases.

---

## ISYNC Request

Incremental Sync request issued after the Full Sync one may look as follows.

- Preserving the same Sync Frame as before:

        GET /restapi/v1.0/account/~/extension/~/message-sync?syncType=ISync&syncToken=AAAAAv8AAAE1sc6UAP_______________wAAATlo9mWw

- Expanding SyncFrame (new dateFrom):

        GET /restapi/v1.0/account/~/extension/~/message-sync?syncType=ISync&syncToken=AAAAAv8AAAE1sc6UAP_______________wAAATlo9mWw&dateFrom=2012-02-24

- Expanding SyncFrame (bigger record count):

        GET /restapi/v1.0/account/~/extension/~/message-sync?syncType=ISync&syncToken=AAAAAv8AAAE1sc6UAP_______________wAAATlo9mWw&recordCount=30

The following parameters are generally allowed in request:

- **syncType** — (mandatory) ISync for Incremental Sync request.

- **syncToken** — (mandatory) Sync Token returned by previous synchronization operation.

- **dateFrom**, **dateTo** — modify the time range of SyncFrame. If dateTo is omitted the server returns messages created by current time. If dateFrom is omitted the server returns messages one week older than dateTo.

- **recordCount** — modifies Sync Frame size.

The response for server is quite similar as in case of FSYNC with the following differences:

- Server will return ONLY new or changed messages metadata.

- For new/modified messages all metadata is returned.

- For deleted or purged messages only message ID and availability status is returned.
