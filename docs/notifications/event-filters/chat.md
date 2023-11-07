# Team Messaging Chats Event

*Since 1.0.32 (Release 9.3)*

Event filter `/team-messaging/v1/chats` enables notifications in case of a team messaging chat change (creation, update, removal).

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `UnifiedAppDesktop`| Access to desktop RingCentral application |

## Event payload

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Internal identifier of a chat |
| `name` | string | Name of a chat |
| `description` | string | Description of a chat |
| `type` | 'PrivateChat' or 'Group' or 'Team' or 'PersonalChat'| Type of a chat |
| `status` |'Active' or 'Archived' | Status of a team. For 'Team' chat type only |
| `members` | Collection of string | List of chat members |
| `isPublic` | boolean | Team access level. For 'Team' group type only |
| `creationTime` | date-time | Chat creation datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) |
| `lastModifiedTime`| date-time | Chat last change datetime in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) |
| `eventType` | 'GroupRenamed' or 'GroupJoined' or 'GroupLeft' or 'GroupChanged' | Type of a chat event. Only the person who joined/was added to a chat will receive 'GroupJoined' notification. Only the person who left/was removed from a chat will receive 'GroupLeft' notification |

## Example #1: chat joined

```json
{!> code-samples/events/chat-1.json !}
```


## Example #2: chat renamed

```json
{!> code-samples/events/chat-2.json !}
```

## Example #3: user left chat

```json
{!> code-samples/events/chat-3.json !}
```
