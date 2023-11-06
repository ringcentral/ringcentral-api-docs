# Team Messaging Chats Event

*Since 1.0.32 (Release 9.3)*

Event filter `/team-messaging/v1/chats` enables notifications in case of a team messaging chat change (creation, update, removal).

**Required Permissions**

| Permission     | Description           |
|----------------|-----------------------|
| `UnifiedAppDesktop`| Access to desktop RingCentral application |

## Team Messaging Chats Event

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
 {
    "uuid": "3007219717146626347",
    "event": "/team-messaging/v1/chats",
    "timestamp": "2021-03-26T09:21:34.548Z",
    "subscriptionId": "de38e1ee-2497-41ed-8662-7fb3a1cfba8d",
    "ownerId": "62534323",
    "body": {
      "id": "1055879168002",
      "name": null,
      "description": null,
      "type": "Group",
      "status": "Active",
      "members": [
        "62534323",
        "2093617004",
        "2071417012"
      ],
      "isPublic": null,
      "creationTime": "2021-03-26T09:21:33.168Z",
      "lastModifiedTime": "2021-03-26T09:21:33.168Z",
      "eventType": "GroupJoined"
    }
  }
```


## Example #2: chat renamed

```json
 {
    "uuid": "8657135170884424232",
    "event": "/team-messaging/v1/chats",
    "timestamp": "2021-03-26T09:22:12.366Z",
    "subscriptionId": "de38e1ee-2497-41ed-8662-7fb3a1cfba8d",
    "ownerId": "62534323",
    "body": {
      "id": "47611420678",
      "name": "Team #1",
      "description": "Integration Team",
      "type": "Team",
      "status": "Active",
      "members": [
        "1813452005",
        "62534323",
        "2071417012"
      ],
      "isPublic": false,
      "creationTime": "2020-06-19T16:57:47.664Z",
      "lastModifiedTime": "2021-03-26T09:22:12.348Z",
      "eventType": "GroupRenamed"
}
```

## Example #3: user left chat

```json
{
    "uuid": "4878974149435952286",
    "event": "/team-messaging/v1/chats",
    "timestamp": "2021-03-26T09:19:41.384Z",
    "subscriptionId": "de38e1ee-2497-41ed-8662-7fb3a1cfba8d",
    "ownerId": "62534323",
    "body": {
      "id": "69508734982",
      "name": "Team",
      "description": null,
      "type": "Team",
      "status": "Active",
      "members": [
        "293401010179"
      ],
      "isPublic": false,
      "creationTime": "2021-03-26T09:18:54.924Z",
      "lastModifiedTime": "2021-03-26T09:19:41.302Z",
      "eventType": "GroupLeft"
    }
  }
```
