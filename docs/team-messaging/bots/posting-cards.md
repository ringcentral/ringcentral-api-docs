# Building a RingCentral bot from scratch: posting adaptive cards with bots

## Quick review

Welcome to part two of our bot development guide. In part one, we take developers through the [basic architectural building blocks of a simple bot add-in](../walkthrough). We demonstrate:

* How to create a bot
* How to install and test a bot in sandbox
* How to subscribe to post and chat events
* How to post and respond to simple text messages

### What's next?

In part two of our bot development guide, we round out the bot we started to build with a full-circle use case common to many bots:

1. Post a card
2. Process input from a user interacting with the card
3. Updating the card previously posted, to reflect a state change

## Posting cards via a bot

Bots post adaptive cards to a chat via the REST API, for which a different set of operations exist. To post a card to a chat, we use the [createCard](https://developers.ringcentral.com/api-reference/Adaptive-Cards/createGlipAdaptiveCard) operation. Let's add the following method to your bot app:

Sample code of a private bot
```js
{!> code-samples/team-messaging/private-bot.js [ln:256-264] !}
```

Sample code of a public bot
```js
{!> code-samples/team-messaging/public-bot.js [ln:297-305] !}
```

Next, we want to update the bot to respond to a new command. When a user types "hello" to the bot, the bot will respond by posting a card. Let's update our callback handler accordingly:

Sample code of a private bot
```js
{!> code-samples/team-messaging/private-bot.js [ln:124-127,146-148,166] !}
```

Sample code of a public bot
```js
{!> code-samples/team-messaging/public-bot.js [ln:143-146,176-178,201] !}
```

Finally, create a helper function to return the JSON for an adaptive card:

```js
{!> code-samples/team-messaging/private-bot.js [ln:276-333] !}
```

With the above changes made to your bot app, you will be able to post an adaptive card instead of just a text message.

## Receiving interactive messaging events

Now, let's update our bot application again. This time we will add functionality to allow your bot to receive messaging events when a user submits data via the adaptive card posted above.

First, let's update the settings of your bot to send outbound Webhook when users interact with your card.

1. Navigate to the "Settings" screen for your bot inside of the Developer Console.
2. Scroll to the bottom, and enable the feature "Interactive Messages" feature.
3. In the Outbound Webhook URL field, enter in the URL at which your app will receive events.

<img class="img-fluid" style="max-width: 500px" src="../interactive-messages.png" >

Next, we go back to our code to add an express handler for receiving adaptive card events.

```js
{!> code-samples/team-messaging/private-bot.js [ln:230-242] !}
```
Sample code of a private bot

```js
{!> code-samples/team-messaging/public-bot.js [ln:265-284] !}
```
Sample code of a public bot. As you can see, the difference in a public bot is that we need to detect a user account of a user who interacts with the bot, and load the correct access token of that account to post a card back to that user accordingly.

In this example, we demonstrate how to send response in a new card and how to update a card with the response. There are 2 buttons in our sample card, one for sending response in a new card, one for updating the existing card specified in the `data.path` value. When we receive a *user-submit* event, we will detect the `data.path` value and decide to post back accordingly.

```js
{!> code-samples/team-messaging/private-bot.js [ln:298-318] !}
```

## Send response in a new card

```js
{!> code-samples/team-messaging/private-bot.js [ln:230-231,234-236,242] !}
{!> code-samples/team-messaging/private-bot.js [ln:334-354] !}
```

<img class="img-fluid" src="../../manual/bot-send-card.png" >

## Update a card with the response

```js
{!> code-samples/team-messaging/private-bot.js [ln:230-231,237-240,242] !}
{!> code-samples/team-messaging/private-bot.js [ln:265-274] !}
```

<img class="img-fluid" src="../../manual/bot-update-card.png" >

## How will your bot be different?

With the above code in place, all the building blocks of a great bot that include the most common user flows are in place. But how will your bot likely be different?

For starters, your bot will respond to a different set of commands. More importantly though, your bot is also likely to communicate to a third-party API in response to the input you receive from a user.

Here are a few other things you may consider implementing for your bot:

* Respond to a UserAdded event, and when you detect that the bot has been added to a chat, post a message to that chat introducing the bot to everyone.
* Implement a `help` command that will respond with a list of commands your bot is capable of responding to.
* If your bot will be installed by users outside of your own organization, you will need to implement a persistence layer to store the API access keys associated with each of the organizations that have installed your bot.

!!! tip "Fork this bot on Github"
    Feel free to save time by forking the bot discussed in this walkthrough at [Github](https://github.com/ringcentral-tutorials/ringcentral-bot-nodejs-demo.git).
