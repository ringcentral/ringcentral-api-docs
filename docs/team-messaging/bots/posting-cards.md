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

```js
{!> code-samples/team-messaging/bot-app-with-cards.js [ln:166-176] !}
```

Next, we want to update the bot to respond to a new command. When a user types "hello" to the bot, the bot will respond by posting a card. Let's update our callback handler accordingly:

```js 
{!> code-samples/team-messaging/bot-app-with-cards.js [ln:138-151] !}
```

Finally, create a helper function to return the JSON for an adaptive card:

```js
{!> code-samples/team-messaging/bot-app-with-cards.js [ln:243-272] !}
```

With the above changes made to your bot app, you will be able to post an adaptive card instead of just a text message. 

## Receiving interactive messaging events

Now, let's update our bot application again. This time we will add functionality to allow your bot to receive outbound webhooks when a user submits data via the adaptive card posted above. 

First, let's update the settings of your bot to send outbound webhooks when users interact with your card. 

1. Navigate to the "Settings" screen for your bot inside of the Developer Console. 
2. Scroll to the bottom, and enable the feature "Interactive Messages" feature.
3. In the Outbound Webhook URL field, enter in the URL at which your app will receive events. 

<img class="img-fluid" style="max-width: 500px" src="../interactive-messages.png" >

Next, we go back to our code to add an express handler for receiving outbound webhook events. 

```js
{!> code-samples/team-messaging/bot-app-with-cards.js [ln:178-180] !}
{!> code-samples/team-messaging/bot-app-with-cards.js [ln:187] !}
```

## Updating a card your bot previously posted

Next, let's flesh out our handler to extract the form value that is submitted by the user, and then to update the card we previously posted with a new card that echos back to the user the name they typed into the form. 

```js
{!> code-samples/team-messaging/bot-app-with-cards.js [ln:178-187] !}
```

The code above makes use of two helper functions. Here is one that will return the contents of the new adaptive card to replace the one initially posted:

```js
{!> code-samples/team-messaging/bot-app-with-cards.js [ln:275-294] !}
```

Finally, let's add the helper function that will update an existing card:

```js
{!> code-samples/team-messaging/bot-app-with-cards.js [ln:189-204] !}
```

!!! bug "Updating existing cards will get future improvements"
    Currently, the outbound webhook associated with a user interactive with an adaptive card does not contain sufficient information for an application to identify the exact card that was interacted with. In an upcoming release this information will be added. 
	In the meantime, the sample code here relies on an imperfect workaround, which caches card IDs in memory. This is sufficient for a demo, but not recommended for production use. 
    The card ID cache is created:
    ```js
    {!> code-samples/team-messaging/bot-app-with-cards.js [ln:20] !}
    ```
    The card ID cache is updated:
    ```js
    {!> code-samples/team-messaging/bot-app-with-cards.js [ln:166-176] !}
    ```
    Card IDs are fetched from the cache:
    ```js
    {!> code-samples/team-messaging/bot-app-with-cards.js [ln:189-204] !}
    ```

    This issue will be fixed in November 2021. 

## How will your bot be different?

With the above code in place, all the building blocks of a great bot that include the most common user flows are in place. But how will your bot likely be different?

For starters, your bot will respond to a different set of commands. More importantly though, your bot is also likely to communicate to a third-party API in response to the input you receive from a user. 

Here are a few other things you may consider implementing for your bot:

* Respond to a UserAdded event, and when you detect that the bot has been added to a chat, post a message to that chat introducing the bot to everyone. 
* Implement a `help` command that will respond with a list of commands your bot is capable of responding to.
* If your bot will be installed by users outside of your own organization, you will need to implement a persistence layer to store the API access keys associated with each of the organizations that have installed your bot. 

!!! tip "Fork this bot on Github"
    Feel free to save time by forking the bot discussed in this walkthrough at [Github](https://github.com/pkvenu/ringcentral-bot-demo/).
