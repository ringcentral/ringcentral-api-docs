# Message Synchronization

We have already considered Message Store which allows to send ad-hoc request to create, retrieve, update or delete messages. But in a real world it is often necessary to solve more sophisticated problems. For example, one of the typical usage scenarios in respect to messaging is synchronization of local (i.e. cached on client side) mailbox representation with the server. Let's take a look on the basic steps of such scenario.

When a client application logs in for the first time, it retrieves all the messages (variant: top N most recent ones, or messages for the last day/3 days/week/etc.) from server and caches them locally. In most cases it is reasonable to transfer not all but only basic information about messages (for example, message "headers" or metadata).

Application user is allowed to go through message list, open them (which may require separate request to server to download full message content), update their status and delete them.

Application checks server for updates periodically or upon user's request. In case of any changes on server (i.e. new messages or updates/removals) local representation is also updated. 

User may be allowed also to view "older" messages. In this case application downloads them from server and starts to listen for changes in them.

In order to simplify development of such applications RingCentral provides Message Synchronization API (or Message Sync API).

## How It Works

First of all we need to describe some basic terms.

-   **Sync Frame** — the range of messages (possibly restricted by some filters) which are synchronized between client and server. Usually Sync Frame is defined by creationDate range plus additional filters like message type, direction, etc.

    Examples of Sync Frames:

    - inbound faxes received from Feb 25,12:00 till Feb 26, 12:00

    - outbound SMS messages sent from Feb 25,12:00 till now ("open" sync frame)

-   **Sync Type** — type of synchronization action, one of the following:

    - **Full Sync (FSync)** — retrieval of all messages satisfying client criteria (i.e. all incoming SMS messages within the last day). FSYNC request defines initial Sync Frame and produces first Sync Token (see below) for subsequent flow.

    - **Incremental Sync (ISync)** — retrieval of messages which have been changed since last Full or Incremental Sync. Client has to provide previously returned Sync Token which contains all the information about Sync Frame.

-   **Sync Token** – special token which is included in FSync/ISync response and has to be included in next ISync request. It allows server to understand which mailbox state is currently known to the client and respond with changes accordingly. Sync Token is generated according to the following principles:

    - it includes the datetime of last synchronization;

    - it includes the definition of current Sync Frame (set of filters);

    - it does not include record count;

    - it is encrypted in some way to hide implementation details from client.

Working with Message Sync API could be illustrated by the following example which can be mapped to scenario described above.

1. Application sends FSync request to server indicating required time frame and criteria. Server responds with message data (headers) and Sync Token.

2. When user wants to open, update or delete some of the messages loaded application does it through regular Message Store API using message ID(s).

3. If user presses "Refresh" button, application sends ISync request to server (providing Sync Token returned previously) and gets back new or updated messages, as well as indicator that some messages were removed from server. Application may be also configured to poll server with ISync requests periodically in background.

4. If user presses "More messages" button, application sends ISync request to server but also expands Sync Frame by providing new desired range of messages.

!!! alert "FYI"
    In order to avoid message loss all sync requests are handled with overlapping of time periods. When handling request from the client, the server has to return records from the ISync time + Delta, where Delta is 5 sec.

!!! alert "FYI"
    Message Sync API supports only retrieval operations. Creation of new messages and all updates should go through regular Message Store API.

## FSync Request

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

!!! warning "FYI"
    Due to implementation specifics, the server cannot guarantee the exact number of records that is specified in recordCount parameter. So the client application should be ready to get more records than it is requested in some rare cases.

The corresponding response from server will be:

```json
{
   "uri": "https://.../message-sync?messageType=VoiceMail&syncType=FSync&dateFrom=2012-02-25T00:00:00.000Z",
             "records":    [
      {
         "uri": "https://.../message-store/308833278010",  "id": 308833278010,
         "to": [{"contact": {"name": "John Smith"}}],
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

!!! warning "FYI"
    Message Sync API requests do not support paging as other APIs since it is not applicable for synchronization use cases.

## ISync Request

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

The response for server is quite similar as in case of FSync with the following differences:

- Server will return ONLY new or changed messages metadata.

- For new/modified messages all metadata is returned.

- For deleted or purged messages only message ID and availability status is returned.
