# Team Messaging Post Event

*Since 1.0.32 (Release 9.3)*

Event filter `/team-messaging/v1/posts` enables notifications in case of a team messaging post change (creation, update, removal).

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `UnifiedAppDesktop`| Access to desktop RingCentral application |

## Team Messaging Post Event

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a post |
| `groupId` | string | Internal identifier of a chat the post belongs to |
| `type` | 'TextMessage' or 'PersonJoined' or 'PersonsAdded' or 'Card' | Type of a post event |
| `text` | string | Text of a message (for 'TextMessage' type only) |
| `creatorId` |string| Internal identifier of a user - author of a post |
| `addedPersonsIds`| Collection of string | For 'PersonsAdded' post type only. Identifiers of persons added to a chat|
| `removedPersonsIds`| Collection of string | For 'PersonsRemoved' post type only. Identifiers of persons removed from a chat|
| `creationTime` | date-time | Post creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) |
| `lastModifiedTime`| date-time | Post last change datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) |
| `eventType` | 'PostAdded' or 'PostChanged' or 'PostRemoved' | Type of a post event |
| `mentions` | Collection of Mentions Info | List of mentions in a post text (with personal names) |
| `attachments`| Collection of attachments| Attachments added to a post |
| `title` | string | Title of a post |
| `iconUri` | string | Link to an post icon |
| `iconEmoji` | string | Emoji used as an icon for this message |
| `activity`  | string | Label of activity type |

### Mentions Info

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a user |
| `type` | 'Person' or 'Team' or 'File' or 'Link' or 'Event' or 'Task' or 'Note' or 'Card'| Type of a mention |
| `name` | string | Name of a user |


## Example #1: message posted

```json
{
    "uuid": "6452004109062593690",
    "event": "/team-messaging/v1/posts",
    "timestamp": "2021-03-26T09:18:41.460Z",
    "subscriptionId": "de38e1ee-2497-41ed-8662-7fb3a1cfba8d",
    "ownerId": "62534323",
    "body": {
      "id": "26848769679364",
      "groupId": "995723345922",
      "type": "TextMessage",
      "text": "Hello, World!",
      "creatorId": "62534323",
      "addedPersonIds": null,
      "creationTime": "2021-03-26T09:18:41.105Z",
      "lastModifiedTime": "2021-03-26T09:18:41.105Z",
      "attachments": null,
      "activity": null,
      "title": null,
      "iconUri": null,
      "iconEmoji": null,
      "mentions": null,
      "eventType": "PostAdded"
    }
  }

```

## Example #2: message updated

```json
{
    "uuid": "8508428295461025835",
    "event": "/team-messaging/v1/posts",
    "timestamp": "2021-03-26T09:21:11.894Z",
    "subscriptionId": "de38e1ee-2497-41ed-8662-7fb3a1cfba8d",
    "ownerId": "62534323",
    "body": {
      "id": "26848795934724",
      "groupId": "995723345922",
      "type": "TextMessage",
      "text": "Hello, World :)",
      "creatorId": "62534323",
      "addedPersonIds": null,
      "creationTime": "2021-03-26T09:21:03.702Z",
      "lastModifiedTime": "2021-03-26T09:21:11.866Z",
      "attachments": null,
      "activity": null,
      "title": null,
      "iconUri": null,
      "iconEmoji": null,
      "mentions": null,
      "eventType": "PostChanged"
    }
  }
```

## Example #3: message deleted

```json
{
    "uuid": "7095914832707027583",
    "event": "/team-messaging/v1/posts",
    "timestamp": "2021-03-26T09:20:47.090Z",
    "subscriptionId": "de38e1ee-2497-41ed-8662-7fb3a1cfba8d",
    "ownerId": "62534323",
    "body": {
      "id": "26848769679364",
      "eventType": "PostRemoved"
    }
  }
```
