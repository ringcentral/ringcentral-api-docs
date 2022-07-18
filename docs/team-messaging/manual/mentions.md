# Mentioning users via the REST API

A key need in a team messaging environment is capturing the attention of a person or group within it. When a person is mentioned in a conversation for example, their unread messages in that conversation is highlighted to indicate that a specific message was directed at them. For example:

<img src="../mentions.png" class="img-fluid">

When a bot needs to mention a user, they use a special markdown syntax to do so:

```html
![:Person](<INSERT PERSON ID>)
```

A bot can also mention an entire team using this markdown syntax:

```html
![:Team](<INSERT TEAM ID>)
```

Within the context of sending a message in Javascript, it might look like this:

```js
{!> code-samples/team-messaging/mention.js !}
```
