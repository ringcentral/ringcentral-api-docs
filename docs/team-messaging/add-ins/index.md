# Building a RingCentral add-in

!!! info "The RingCentral Add-in Framework is currently in beta"

A RingCentral add-in is type of add-in that integrates functionality directly into a RingCentral client, like our [Team Messaging and Video client](https://www.ringcentral.com/apps/rc-app). There are currently two types of add-ins we currently support. 

### Bots

A bot is an add-in that provides RingCentral customers with a conversational interface with an app to perform common tasks. Once they are installed, whenever a user sends a message to a bot, RingCentral will transmit a webhook to the bot allowing the bot app to respond to the message directed at it. Bot have the following capabilities:

* Receive webhook notifications when:
    * your bot is mentioned
    * your bot is added to a chat
    * someone messages with your bot in a private chat
* Post messages to a chat via the REST API
* Post adaptive cards to a chat via the REST API
* Update adaptive cards previously posted via the REST API

[Build a bot using a step-by-step walkthrough &raquo;](../bots/walkthrough/)

### Notification apps

A notification app is a type of add-in that helps build a communication bridge between a third-party service and users of RingCentral, by converting events/webhooks emitted by a service and converting them into messages and cards that are then posted to a chat to keep a team up to date. An example of a notification app that a developer can appreciate is one that would notify a team whenever a pull request is submitted for a github repository you are watching, and to expose a button to allow a recipient of that message to merge the pull request. Notification apps have the following capabilities:

* Design your own integrated installation and configuration experience
* Post messages to a chat via an incoming webhook
* Post adaptive cards to a chat via an incoming webhook

??? warning "Notification apps cannot yet update messages"
    Notification apps have the limitation currently in which they can only post messages, because the installation process of a notification app does not provide the app with an auth token. As a result, notification apps cannot currently update a message they post. If your use case requires this ability, we recommend building a bot. 

[Create a notification app &raquo;](./creation/)

## Helping customer find and install add-ins

RingCentral add-ins are discovered and installed via the [RingCentral App Gallery](https://www.ringcentral.com/apps/). The RingCentral App Gallery can be accessed via the web, or from within the RingCentral team messaging client in the "Apps" section. 

To help RingCentral customers find and discover the add-in you build, be sure to [graduate your app](../../getting-started/graduate-app/), and then [create an App Gallery profile](../../getting-started/promote-app/). Once your profile is approved, RingCentral App Gallery editors will work to help your add-in get discovered by ensuring it is placed in the right categories and collections. 

## Known issues

The RingCentral Add-in Framework is currently in beta. Here is a list of some of the currently issues that may impact developers.

### Notification apps cannot update messages

Notification apps during the beta are not yet able to update a message or card the notification app previously posted. This will be fixed in the future. For the time being, if you need to update a team on a state change to a card we recommend you post a new card to the chat. 

### Private add-ins cannot be installed via the App Gallery

If your bot or notification app is configured as "private," then the only way they can be installed is via the RingCentral Developer Console. In an upcoming release, we will enable private apps to be discovered and installed through the App Gallery. 
