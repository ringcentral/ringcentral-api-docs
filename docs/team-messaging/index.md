# Introduction to Team Messaging Integrations

<div class="jumbotron pt-1">
  <h2 class="h3 display-5">Getting Started with the Team Messaging API</h2>
  <p class="lead">RingCentral Team Messaging, a.k.a. "Glip," is a team collaboration solution that helps organize and centralize team communication. It is an exciting platform to develop for given the wide range of use cases, and integration possibilities.</p>
  <p>We invite all developers to try out our Team Messaging API by writing a simple app to create a team in almost no time at all. Get started using a Quick Start in any of the following languages:</p>
  <a href="quick-start/#javascript" class="btn btn-light qs-link">Javascript &raquo;</a>
  <a href="quick-start/#php" class="btn btn-light qs-link">PHP &raquo;</a>
  <a href="quick-start/#python" class="btn btn-light qs-link">Python &raquo;</a>
  <a href="quick-start/#ruby" class="btn btn-light qs-link">Ruby &raquo;</a>
  <a href="quick-start/#java" class="btn btn-light qs-link">Java &raquo;</a>
  <a href="quick-start/#c#" class="btn btn-light qs-link">C# &raquo;</a>
</div>

## What can you build using the Team Messaging API?

### Build a bot

Bots are automated agents that users can interact with in a coversational manner. Bots are useful when one wishes:

* to delivery notifications to users privately
* automate interactions with users in a conversational manner

RingCentral [supports and offers a number of Bot frameworks](./manual/frameworks/) to help developers create bot applications. To get started creating a bot, we recommend using our [Javascript Bot Framework](https://ringcentral.github.io/ringcentral-chatbot-js/) which enables developers to create a bot in 10 lines of code, like this "Ping Bot:"

```javascript linenums="1"
const createApp = require('ringcentral-chatbot/dist/apps').default

const handle = async event => {
  const { type, text, group, bot } = event
  if (type === 'Message4Bot' && text === 'ping') {
    await bot.sendMessage(group.id, { text: 'pong' })
  }
}
const app = createApp(handle)
app.listen(process.env.RINGCENTRAL_CHATBOT_EXPRESS_PORT)
```

### Build a notification app

[Incoming Webhooks](./manual/webhooks/) can be used to create inputs into which a 3rd-party can post JSON formatted events or messages and have those posted directly into a chat as a [richly formatted messages](./manual/formatting). For example, the [RingCentral Salesforce Integration](https://zapier.com/apps/glip/integrations/salesforce) helps keep teams up to date by relaying the creation of new leads and opportunities into a chat of your choosing:

<img src="../img/glip_post_attachment_salesforce.png" class="img img-fluid" width="30%">

### Integrate with project management

RingCentral Team Messaging can also be used to help with project management. In Team Messaging you can create:

* **Tasks** - manage task/to-do lists, assign tasks to others, be notified when tasks are completed
* **Events** - create and share calendar events, project due-dates, co-worker vacations and more
* **Notes** - create and share meeting notes, or maintain a scratch pad of important ideas

* Learn about the [Tasks API](https://developers.ringcentral.com/api-reference/Calendar-Events/listGroupEvents)
* Learn about the [Events API](https://developers.ringcentral.com/api-reference/Tasks/listChatTasks)
* Learn about the [Notes API](https://developers.ringcentral.com/api-reference/Notes/listChatNotes)

