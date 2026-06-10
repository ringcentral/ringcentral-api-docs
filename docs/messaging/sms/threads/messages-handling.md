# Thread messaging message store

## List messages

Any SMS handler can view all messages in the thread messaging store for the common resources they belong to, regardless of whether they are assigned to a specific thread. This enables handlers to access not only their own conversations but also those assigned to teammates, improving visibility, collaboration, and overall continuity of service.

The list message threads API supports multiple filters which can be used to optimize the response which returns only interested messages. For example, a handler can set the “threadStatus”=”Open” to list only messages from open threads, or set the “ownerExtensionIds” to a common resource ID (e.g. a call queue extension ID) to list only messages created for that common resource. This is useful when a handler is a member of multiple common resources.

The [`/restapi/v1.0/account/~/message-threads/messages`](https://developers.ringcentral.com/api-reference/Message-Threads/mthListMessages) API currently supports the following essential filters:

| Filter name | type | Description | Note |
| :---- | :---- | :---- | :---- |
| `threadStatus` | String | Filters threads based on their status: **Open** or **Resolved**. If no status is specified, all threads (both Open and Resolved) will be listed by default. |  |
| `ownerExtensionIds` | Array of string | Filters messages based on one or several common resources identified by the common resource IDs. If not specified, return messages from all common resources the current authenticated user is a SMS handler.  |  |
| `availability` | enum | Can be specified to "Alive" and/or "Deleted". |  |
| `messageIds` | Array of string | Return messages matches the specified message Ids. If not specified, returning all messages from common resources the current authenticated user is a SMS handler. |  |
| `creationTimeFrom` | string | Start date/time for resulting messages created after the specified date/time. In UCT time. | If not specified, the default value is the last 24 hours. |
| `creationTimeTo` | string | End date/time for resulting messages created before the specified date/time. In UCT time. | If not specified, the default value is the current time. |

### Sample response

```json
[
  {
    "id": "2904652345",
    "threadId": "ebf18942-9cd4-4980-9fa3-e1ddfec7c45a",
    "availability": "Alive",
    "creationTime": "2026-02-12T21:06:33.706Z",
    "lastModifiedTime": "2026-02-12T21:10:05.921Z",
    "direction": "Outbound",
    "messageStatus": "Delivered",
    "text": "Hi Bill, your order was shipped and here is the tracking number #1000203330.",
    "author": {
      "extensionId": "62295327016",
      "name": "Jenn G",
      "extensionType": "User"
    }
  },
  {
    "id": "2901714323",
    "threadId": "ebf18942-9cd4-4980-9fa3-e1ddfec7c45a",
    "availability": "Alive",
    "creationTime": "2026-02-12T17:19:56.266Z",
    "lastModifiedTime": "2026-02-12T17:19:56.266Z",
    "direction": "Inbound",
    "messageStatus": "Received",
    "text": "My order number is 123456, can you let me know the order status?"
  }
]
```

A thread message does not include the pair of sender and recipient phone numbers. Developers should use the `threadId` in each message record to connect messages in a thread to create a conversation. To detect the pair of phone numbers, developers should call the [Read Message Thread API](../threads-handling/#read-a-message-thread).

## Delete messages

Any SMS handler can delete a message in the thread messaging store for the common resources they belong to, regardless of whether they are assigned to a specific thread. This provides flexibility in message management, allowing handlers to perform cleanup or moderation actions across shared resources without requiring explicit thread ownership.

To delete multiple messages in a single API call, developers can specify a list of message IDs to be deleted. Batching deletions this way reduces the number of API calls required and improves overall performance, making it especially useful when managing high volumes of messages.

It is the developer's responsibility to restrict message deletion if the application requires that only the assignee can delete messages from their threads. This access control logic must be implemented at the application level, as the API does not enforce ownership-based deletion restrictions by default. Developers should validate the requesting user's identity and thread assignment before invoking the delete operation.

### Sample code

```JavaScript
async function delete_messages(){
  try{
    let bodyParams = {
      ids: ["4344768583", "4353120793"]
    }
    let endpoint = "/restapi/v1.0/account/~/message-threads/messages"
    await platform.delete(endpoint, bodyParams)
    console.log("Message(s) deleted")
  }catch(e){
    console.log(e.message)
  }
}
```

## Sync thread entries (messages)

Inbound and outbound messages are grouped into message threads based on a combination of the service and the customer phone number. The **Sync Thread Entries** API allows SMS handlers to retrieve and monitor message records within these threads, ensuring that applications remain up to date with the latest inbound and outbound message activity.

The Sync API supports two synchronization modes, defined by the **`syncType`** parameter: **FSync** (full synchronization) and **ISync** (incremental synchronization).

- The **FSync** mode returns all message records that belong to currently active and open thread(s), providing an initial snapshot of thread messages.  
- The **ISync** mode returns only those message records whose properties have changed since the initial FSync call or the most recent ISync call, enabling efficient and incremental tracking of message updates.

When calling the API in **FSync** mode, developers can optionally specify the **`scope`** parameter to control which thread entries are included in the response, depending on the desired use case:

* `scope="Accessible"` — Returns entries from all threads accessible to the current SMS handler.  
* `scope="Unassigned"` — Returns entries from accessible threads that are currently unassigned.  
* `scope="AssignedToMe"` — Returns entries from threads assigned to the current SMS handler.  
* `scope="AssignedToMeAndUnassigned"` — Returns entries from threads assigned to the current SMS handler or currently unassigned.  
* `scope="Explicit"` — Returns entries from specific threads identified by the threadIds parameter. When using this scope, a list of thread IDs must be provided.

!!! note

    The **scope** parameter is supported only when calling the API in FSync mode. For ISync calls, the scope is already embedded in the sync token returned by the previous synchronization request.

To use the Sync API effectively, developers should first call the API with syncType=FSync to retrieve the initial set of message records. The response includes a sync token, which must be saved by the application. In subsequent calls, developers use this sync token with syncType=ISync to retrieve only new message records and the message records that have changed since the last synchronization.

```JavaScript
let entriesSyncToken = ""
async function full_sync_thread_messages(){
  try{
    let queryParams = {
      scope: "Accessible",
      syncType: "FSync"
    }
    let endpoint = '/restapi/v1.0/account/~/message-threads/entries/sync'
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    console.log("Full sync message data: ", JSON.stringify(jsonObj, null, 4))
    entriesSyncToken = jsonObj.syncInfo.syncToken
  }catch(e){
    console.log(e.message)
  }
}

async function incremental_sync_thread_messages(){
  if (entriesSyncToken == ""){
    await full_sync_thread_messages()
    return
  }
  try{
    let queryParams = {
      syncType: "ISync",
      syncToken: entriesSyncToken
    }
    let endpoint = '/restapi/v1.0/account/~/message-threads/entries/sync'
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    console.log("Incremental message sync data: ", JSON.stringify(jsonObj, null, 4))
    entriesSyncToken = jsonObj.syncInfo.syncToken
  }catch(e){
    console.log(e.message)
  }
}
```

## Render and download message attachments

If a message contains attachment(s), the attachment's metadata is included in the message object under the `attachments` array as shown in the sample message below:

```json
{
  "id": "4345841054",
  "threadId": "cb1bbb90-8091-4dce-a70d-5491c109546f",
  "availability": "Alive",
  "creationTime": "2026-05-18T19:24:30.975Z",
  "lastModifiedTime": "2026-05-18T19:34:33.902Z",
  "direction": "Inbound",
  "messageStatus": "Received",
  "text": "Here is the image of the damaged part.",
  "attachments": [
    {
      "size": 65012,
      "contentType": "image/png",
      "id": "488010059",
      "contentUri": "https://media.ringcentral.com/restapi/v1.0/account/80964XXXX/message-threads/messages/4345841054/content/488010059",
      "filename": "image-001.png"
    }
  ]
}
```
<br>
To render attachment(s) directly in a web application UI from the remote server, developers can use the `contentUri` value and include the user’s valid access token when requesting the resource.

For example, to display the image from the sample attachment above, retrieve the user’s access token, construct the authenticated content URI, and assign it to the image element’s src attribute.

```http
<img src='https://media.ringcentral.com/restapi/v1.0/account/80964XXXX/message-threads/messages/4345841054/content/488010059?access_token=valid-user-access-token'></img>
```
<br>
To download attachments and save them locally, developers can send an HTTP GET request to the content URI to retrieve the binary content and save it to a file.

### Sample code

The sample code below download a message attachment(s) and save to a local file.

=== "JavaScript"

    ```javascript
    {!> code-samples/messaging/code-snippets-headers/header.js [ln:1-13] !}
    {!> code-samples/messaging/code-snippets/download-thread-msg-attachments.js [ln:10-] !}
    ```

=== "Python"
    ```python
    {!> code-samples/messaging/code-snippets/download-thread-msg-attachments.py !}
    {!> code-samples/messaging/code-snippets-headers/footer.py [ln:1-6]!}
    ```

=== "PHP"
    ```php
    {!> code-samples/messaging/code-snippets-headers/header.php [ln:1-13] !}
    {!> code-samples/messaging/code-snippets/download-thread-msg-attachments.php [ln:2-]!}
    ```

=== "Ruby"
    ```ruby
    {!> code-samples/messaging/code-snippets/download-thread-msg-attachments.rb !}
    {!> code-samples/messaging/code-snippets-headers/footer.rb [ln:1-4] !}
    ```
