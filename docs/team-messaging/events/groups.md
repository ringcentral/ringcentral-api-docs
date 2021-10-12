# Chat events for Team Messaging

Chat events, also known as "group" events, are triggered when some aspect of a chat (a conversation or team) has changed. There are four types of chat events:

* Chat renamed
* Person joined or was added to chat
* Person left of was removed from chat
* Group or chat name/description changed 

Each event type has a unique payload and structure depending upon the event type. The structure of a chat event is [documented within the API Reference](https://developers.ringcentral.com/api-reference/Team-Messaging-Groups-Event), but a few examples are shown below. 

When [subscribing](../outgoing-webhooks/#subscribing-to-an-outgoing-event) to chat events you will need to specify the following event filter:

* `/restapi/v1.0/glip/groups`

Once a subscription has been setup, your application will begin receiving events at the designated URL. 

## Example chat or group events

### Chat renamed event

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

### Person joined event

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

### Person left event

This event is emitted when a person has left the team or was removed from the team.

!!! note "Only the person who has left/was removed will receive this notification."

```json
{
  "eventType": "GroupLeft",
  "id":"637468356"
}
```

### Chat changed event

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

