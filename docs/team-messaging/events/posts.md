# Post events for Team Messaging

Post events are triggered within the context of team messaging whenever some facet of a post is affected. There are three types of post events:

* Post created
* Post removed
* Post changed

Each event type has a unique payload and structure depending upon the event type. The structure of a post event is [documented within the API Reference](https://developers.ringcentral.com/api-reference/Team-Messaging-Post-Event), but a few examples are shown below. 

When [subscribing](../outgoing-webhooks/#subscribing-to-an-outgoing-event) to post events you will need to specify the following event filter:

* `/restapi/v1.0/glip/posts`

Once a subscription has been setup, your application will begin receiving events at the designated URL. 

## How should bots handles post events?

### Handling post added events

When you receive a PostAdded event, here are some tips to help you when creating a bot designed to respond to post events.

* The value of Verification-Token header [should be verified](../../events/interactive-messages/#verifying-the-authenticity-of-an-event)

* Messages where the `body.eventType` is not equal to "PostAdded" should be ignored so that your bot does not reply to post changed events accidentally.

* The `ownerId` property from the event payload should be used to match the `owner_id` stored with the access token to select proper token to reply

* Use the `body.groupId` property from event's payload can be used to direct your response to the proper chat. 

* The `body.text` property contains the text your bot will need to process

* Finally, every bot has a unique id. The `body.creatorId` property should be compared to the bot's id to prevent the bot from replying to its own messages. 

### Replying to a post added event

Bots can post a message in response to a PostAdded event simply by calling the [Team Messaging Post API](../../posting/). For example:

```http
POST /team-messaging/v1/groups/<groupId>/posts
Authorization: Bearer <access_token>
  
{
  "text" : "Hello from Lex bot!"
}
```

## Example events

### Post added event

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

### Post removed event

Event is emitted when new post is removed.

```json
{
  "eventType": "PostRemoved",
  "id": "637468356",
  "groupId": "456775"
}
```

### Post changed event

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

