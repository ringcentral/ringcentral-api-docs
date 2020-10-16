# Post Events for Team Messaging

## Subscribing to Post Events

When [subscribing to post events](../outgoing-webhooks/) you will need to specify the following event filter:

* `/restapi/v1.0/glip/posts`

## Post event structure

Once a subscription has been setup, your application will begin receiving events at the designated URL. There are three post events:

* Post created
* Post removed
* Post changed

Each event will have its own payload depending upon the event type. The payload for post events can be seen below. 

| Parameter | Type | Description |
|-|-|-|
| `eventType` | enum | Post event type which can be one of the following values: `PostAdded`, `PostChanged`, `PostRemoved` |
| `id` | string | Post identifier |
| `groupId` | string | Group/Team identifier |
| `type` | enum | Post type which can be one of the following values: `TextMessage`, `PersonJoined`, `PersonLeft`, `PersonsAdded`, `PersonsRemoved` |
| `text` | string | Message text. For TextMessage post type only. |
| `creatorId` | string | Post author identifier. |
| `addedPersonIds` | array | Identifiers of persons joined the group. For PersonsAdded post type only |
| `removedPersonIds` | array | Identifiers of persons joined the group. For PersonsRemoved post type only |
| `creationTime` | string | Post creation date/time |
| `lastModifiedTime` | string | Post last modification date/time |
| `attachments` | Array | List of attachments |
| `activity` | string | Label of the Activity type. |
| `title` | string | Title of the message. (Can be set for bot's messages only). |
| `iconUri` | URI | URI to an image to use as the icon for this message. |
| `iconEmoji` | URI | Emoji to use as the icon for a message. |
| `mentions` | Array | List of mentions |

## Tips for how bots should handle post added events

When you receive a PostAdded event, here are some tips to help you when creating a bot designed to respond to post events.

* The value of Verification-Token header [should be verified](../outgoing-webhooks/#verifying-webhooks)

* Messages where the `body.eventType` is not equal to "PostAdded" should be ignored so that your bot does not reply to post changed events accidentally.

* The `ownerId` property from the event payload should be used to match the `owner_id` stored with the access token to select proper token to reply

* Use the `body.groupId` property from event's payload can be used to direct your response to the proper chat. 

* The `body.text` property contains the text your bot will need to process

* Finally, every bot has a unique id. The `body.creatorId` property should be compared to the bot's id to prevent the bot from replying to its own messages. 

### How to reply to a PostAdded event

Bots can respond to a PostAdded event simply by calling the [Team Messaging Post API](../posting/). For example:

```http
POST <apiEntryPoint>/restapi/v1.0/glip/groups/<groupId>/posts
Authorization: Bearer <access_token>
  
{
  "text" : "Hello from Lex bot!"
}
```

## Event Payloads

### Post added event payload

Event is emitted when new post is created.

```json
{
  "eventType": "PostAdded",
  "id": "637468356",
  "type": "TextMessage",
  "text": "Hi there!",
  "creatorId": "5574664564",
  "groupId": "456775",
  "creationTime": "2017-02-05T12:00:00Z",
  "lastModifiedTime": "2017-02-05T12:00:00Z",
  "addedPersonIds": null,
  "attachments": [],
  "activity": null,
  "title": null,
  "iconUri": null,
  "iconEmoji": null,
  "mentions": null
}
```

### Post removed event payload

Event is emitted when new post is removed.

```json
{
  "eventType": "PostRemoved",
  "id": "637468356",
  "groupId": "456775"
}
```

### Post changed event payload

Event is emitted when new post is changed.

```json
{
  "eventType": "PostChanged",
  "id": "637468356",
  "text": "Hi there!",
  "creatorId": "5574664564",
  "groupId": "456775",
  "creationTime": "2017-02-05T12:00:00Z",
  "lastModifiedTime": "2017-03-05T12:00:00Z",
  "addedPersonIds": null,
  "attachments": [],
  "activity": null,
  "title": null,
  "iconUri": null,
  "iconEmoji": null,
  "mentions": null
}
```

