# Thread Notes

A message thread can contain a list of internal notes, which are private messages created by any SMS handler with access to the thread (typically handlers assigned to the common resource that is associated with a shared phone number).

Thread notes help handlers document important conversation context, leave reminders, record follow-up actions, and share internal information with other handlers working on the same thread. These notes are intended for internal use only, are not visible to the customer, and do not become part of the SMS conversation itself.

## Example use case

A thread note can be used when the current thread assignee is temporarily unavailable and needs to hand off the conversation to another SMS handler.

For example, if the current thread owner is going on vacation, they can add a note to provide context for their colleagues before reassigning or leaving the thread for someone else to take over.

**Example thread note:**

  ***Customer is asking about upgrading to the premium plan and is waiting for pricing confirmation. I already explained the available options and promised a follow-up by next Tuesday. I’ll be out of office starting tomorrow, so please take ownership of this thread and continue the conversation if the customer replies.***

This type of note helps ensure a smooth handoff by preserving important conversation context, reducing duplicate questions, and allowing another SMS handler to continue assisting the customer without interruption.

When building a thread messaging application, developers can use the Notes APIs described below to implement note management features for users.

These APIs allow users to create, retrieve, update, and manage internal thread notes associated with message threads. By integrating note support into the application, developers can help users collaborate more effectively while handling customer conversations.

## Create notes

To add a note to a thread, get the thread Id, then call the [Create New Note API]() as shown in the JavaScript sample code below:

### Sample code

```JavaScript
async function create_note(){
  try{
    let bodyParams = {
      threadId: "fb31163c-0fa6-442f-a04d-a0b09b5f2f56",
      text: "Customer is asking about upgrading to the premium plan ..."
    }
    let endpoint = "/restapi/v1.0/account/~/message-threads/notes"
    var resp = await platform.post(endpoint, bodyParams)
    let jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj, null, 4))
  }catch(e){
    console.log(e.message)
  }
}
```

### Sample response

```json
{
  "id": "b3b3a850-e5d5-42d7-a68b-1915f4701f2c",
  "threadId": "fb31163c-0fa6-442f-a04d-a0b09b5f2f56",
  "lastModifiedTime": "2026-01-25T17:13:54.805Z",
  "creationTime": "2026-01-25T17:13:54.805Z",
  "availability": "Alive",
  "text": "Customer is asking about upgrading to the premium plan ...",
  "author": {
    "extensionId": "49666XXXX",
    "name": "Alex Jr",
    "extensionType": "User"
  }
}
```

!!! note
    - Can any SMS handler add a note to the thread that they are not an assignee? => Yes
    - Can a note be added to a `Resolved` thread? => No

## List notes

Any SMS handler can retrieve notes from all message threads associated with the common resources to which the handler is assigned.

When listing notes, developers can call the [List Notes API]() and use query parameters to filter the results based on specific criteria, such as common resource(s) identified by the `ownerExtensionIds`, target thread(s) identified by the `threadIds` or specific note(s) identified by the `noteIds` filters. This allows applications to retrieve only the notes relevant to a particular workflow or user experience.

### Sample code

```JavaScript
async function list_notes(){
  try{
    let queryParams = {
      availability: "Alive",
      threadIds: ["fb31163c-0fa6-442f-a04d-a0b09b5f2f56"],
    }
    let endpoint = "/restapi/v1.0/account/~/message-threads/notes"
    var resp = await platform.get(endpoint, queryParams)
    let jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj, null, 4))
  }catch(e){
    console.log(e.message)
  }
}
```

### Sample response

```json
{
  "records": [
    {
      "id": "b3b3a850-e5d5-42d7-a68b-1915f4701f2c",
      "threadId": "fb31163c-0fa6-442f-a04d-a0b09b5f2f56",
      "lastModifiedTime": "2026-01-26T05:22:01.580Z",
      "creationTime": "2026-01-26T05:22:01.580Z",
      "availability": "Alive",
      "text": "I will follow up with this customer!",
      "author": {
        "extensionId": "49667XXX",
        "name": "Jenn L",
        "extensionType": "User"
      }
    },
    {
      "id": "b3b3a850-e5d5-42d7-a68b-1915f4701f2c",
      "threadId": "fb31163c-0fa6-442f-a04d-a0b09b5f2f56",
      "lastModifiedTime": "2026-01-25T17:13:54.805Z",
      "creationTime": "2026-01-25T17:13:54.805Z",
      "availability": "Alive",
      "text": "Customer is asking about upgrading to the premium plan ...",
      "author": {
        "extensionId": "49666XXX",
        "name": "Alex Jr",
        "extensionType": "User"
      }
    },
    ...
  ],
  "paging": {
    ...
  }
}
```

## Update notes

The author of a note can change the note text as long as the thread is `Open`.

### Sample code

```JavaScript
async function update_note(){
  try{
    let bodyParams = {
      text: "Customer is asking about upgrading to the platinum plan ..."
    }
    var noteId = "b3b3a850-e5d5-42d7-a68b-1915f4701f2c"
    let endpoint = `/restapi/v1.0/account/~/message-threads/notes/${noteId}`
    var resp = await platform.patch(endpoint, bodyParams)
    let jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj, null, 4))
  }catch(e){
    console.log(e.message)
  }
}
```

### Sample response

```json
{
    "id": "b3b3a850-e5d5-42d7-a68b-1915f4701f2c",
    "threadId": "fb31163c-0fa6-442f-a04d-a0b09b5f2f56",
    "lastModifiedTime": "2026-01-25T18:01:49.553Z",
    "creationTime": "2026-01-25T17:13:54.805Z",
    "availability": "Alive",
    "text": "Customer is asking about upgrading to the platinum plan ...",
    "author": {
        "extensionId": "49666XXXX",
        "name": "Alex Jr",
        "extensionType": "User"
    }
}
```

!!! note
    - Can a note be updated when the thread status is `Resolved`? => No
    - Only the note author can update their own note(s)

## Delete Notes

The note author can delete their own note(s)

### Sample code

```JavaScript
async function delete_note(){
  try{
    let bodyParams = {
      ids: ["b3b3a850-e5d5-42d7-a68b-1915f4701f2c"]
    }
    let endpoint = "/restapi/v1.0/account/~/message-threads/notes"
    await platform.delete(endpoint, bodyParams)
    console.log("Note(s) deleted")
  }catch(e){
    console.log(e.message)
  }
}
```
