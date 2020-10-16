# Chat Events for Team Messaging

When [subscribing to chat or "group" events](../outgoing-webhooks/) you will need to specify the following event filter:

* `/restapi/v1.0/glip/groups`

## Chat event structure

Once a subscription has been setup, your application will begin receiving events at the designated URL. There are three types of chat or group events:

* Chat renamed
* Person joined or was added to chat
* Person left of was removed from chat
* Group or chat name/description changed

Each event has a unique payload and structure depending upon the event type. The payload for chat events can be seen below. 

| Parameter | Type | Description |
|-|-|-|
| `creationTime` | string (dateTime) | Group creation date/time. |
| `description` | string | Group description. |
| `eventType` | enum | 	Group event type that can be one of the following values: `GroupRenamed`, `GroupJoined`, `GroupLeft`, `GroupChanged` |
| `id` | string | Group identifier. |
| `isPublic` | boolean | For Team group type only. Group access level. |
| `lastModifiedTime` | string (dateTime) | Group last change date/time. |
| `members` | array of string | Group member identifiers. Not returned for GroupRenamed event type. | 
| `name` | string | Group display name.|
| `type` | enum | Group type that can one of the following values: `PrivateChat`, `Group`, `Team`, `PersonalChat`. |

## Event Payloads

### Group Renamed

This event is emitted when some of the group attributes changed (name, description).

```json
{
  "eventType": "GroupRenamed",
  "id": "637468356",
  "type": "Team",
  "name": "My Super Team",
  "creationTime": "2017-02-05T12:00:00Z",
  "lastModifiedTime": "2017-03-05T12:00:00Z"
}
```

### Person Joined

This event is emitted when a person has joined the team or was added to the team.

!!! note "Only the person who has joined/was added will receive this notification."

```json
{
  "eventType": "GroupJoined",
  "type": "Team",
  "id":"637468356",
  "name": "My Team",
  "description": "Best team ever",
  "isPublic": true,
  "creationTime": "2017-02-05T12:00:00Z",
  "lastModifiedTime": "2017-03-05T12:00:00Z",
  "members": [
          "12464564",
          "2344565255",
          "666777777"
        ]
}
```

#### Person Left

This event is emitted when a person has left the team or was removed from the team.

!!! note "Only the person who has left/was removed will receive this notification."

```json
{
  "eventType": "GroupLeft",
  "id":"637468356"
}
```

#### Group Changed

This event is emitted when any person has joined the team, has left the team, was added to the team or removed from the team. Also when privacy ("isPublic") is changed.

```json
{
  "eventType": "GroupChanged",
  "type": "Team",
  "id":"637468356",
  "name": "My Team",
  "description": "Best team ever",
  "isPublic": true,
  "creationTime": "2017-02-05T12:00:00Z",
  "lastModifiedTime": "2017-03-05T12:00:00Z",
  "members": [
          "12464564",
          "2344565255",
          "666777777"
        ]
}
```

