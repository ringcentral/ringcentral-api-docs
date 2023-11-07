# Team Messaging Post Event

*Since 1.0.32 (Release 9.3)*

Event filter `/team-messaging/v1/posts` enables notifications in case of a team messaging post change (creation, update, removal).

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `UnifiedAppDesktop`| Access to desktop RingCentral application |

## Event payload

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
{!> code-samples/events/post-1.json !}
```

## Example #2: message updated

```json
{!> code-samples/events/post-2.json !}
```

## Example #3: message deleted

```json
{!> code-samples/events/post-3.json !}
```
