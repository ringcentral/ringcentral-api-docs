# Building a RingCentral bot from scratch

A RingCentral Team Messaging bot provides a conversational interface for performing common tasks. In this guide, you will learn how to build a simple ping-pong bot from scratch, giving you a closer look at the bot design pattern.

!!! tip "Try the [RingCentral bot framework](../node/) to get up and running faster and with less code."

Before you begin, make sure you have logged into your RingCentral developer account via the [RingCentral Developer Console](https://developers.ringcentral.com/my-account.html#/applications).

## Step 1. Start ngrok

Bot servers must be accessible over the open Internet to allow RingCentral to send them messages. When developing a bot locally a tunneling tool like ngrok is useful. 

??? tip "Install ngrok"
    * Go to [https://ngrok.com/](https://ngrok.com) and download the version that corresponds to your platform. In our case, we'll be downloading the Mac OS X 64-bit version.
    * You can extract ngrok into the folder of your preference and run ngrok from there.

Launch ngrok by running the following command:

```bash 
$ ngrok http 3000
```

If every thing goes well you should see the following output to your terminal.

<img src="../../../img/ngrok-running.png" class="img-fluid" style="max-width: 400px">

Make note of your https forwarding URL, we will use that shortly when creating your config file. 

## Step 2. Create a bot application

With a proxy running, we now have all the information we need to create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Bot App" button below. 

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Chatbot+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+chat+bot+on+RingCentral&public=false&type=ServerBot&carriers=7710,7310,3420&permissions=ReadAccounts,SubscriptionWebhook,TeamMessaging,EditExtensions&redirectUri=" class="btn btn-primary">Create Bot App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "Bot App for Team Messaging" under "What type of app are you creating?"</li>
<li>Select "Only members of my organization/company" under "Who will be authorized to access your app?"
<li>On the second page of the create app wizard, enter your app's name and description. Then select the following permissions:
  <ul>
    <li>Glip</li>
    <li>Webhook Subscriptions</li>
    <li>Edit Extensions</li>
    <li>Read Accounts</li>
  </ul>
  </li>
</ol>
</div>

### Set your OAuth redirect URL

Before you create your bot app, you will need to set the OAuth redirect URL. Into that URL enter in the ngrok URL from above, with `/oauth` appended to the end. For example:

> https://d6b2306cdf40.ngrok.io/oauth

This URL will be invoked whenever your bot is installed, and will be the means by which you obtain an access key for the account of the user performing the installation.


## Step 3. Clone and setup the sample application

To help you get started, we have a sample application that stubs out much of what you will need to create. Clone this Github repository like so:

```bash
$ git clone https://github.com/pkvenu/ringcentral-bot-demo.git
$ cd ringcentral-bot-demo
$ npm install
```

Next, let's setup the environment and configuration of the bot. Copy the contents of `.env.template` to `.env`.

```bash
$ cp .env.template .env
```

Edit the `.env` you just created and enter in the values for `CLIENT_ID` and `CLIENT_SECRET` that you received when you created the bot in the RingCentral Developer Console above. Then, set `REDIRECT_HOST` to your ngrok server URL. I would look something like this:
   
```json
{!> code-samples/team-messaging/env-template.json !}
```

Finally, launch your server.

```bash
$ npm start
```

## Step 4. Add the bot to your RingCentral account

Return to the Developer Console and navigate to the "Bot" tab for the app you recently created. Click on the "Add to RingCentral" button.

<img class="img-fluid" src="../../manual/add-to-ringcentral.png" style="max-width: 600px">

This will install the bot into your Developer Sandbox. When a bot is installed, RingCentral will attempt to verify that the bot server is running by sending it a quick message to the OAuth redirect URI. At the same time it will transmit auth credentials necessary for making future API calls. 

<img src="../../manual/bot-authorization.png" class="img-fluid" style="max-width: 400px">

The access key ultimately obtained through the above process is a *permanent* access key. This means you do not need to worry about refreshing the token after it has been issued. It is the developer's responsibility to manage this access key. If the app was configured to be a "public" app, this would mean storing the access key in a database and mapping it to a customer Id of some kind. That way when a bot receives a webhook event notifying the bot of a message posted to a team, the customer Id can be used to look up the corresponding access key so the bot can post a message in response. 

??? note "Discussion: walking through the code"
    Inside the sample application, we setup a handler to respond to posts to our `/oauth` handler. This handler will not only verify to RingCentral that the bot is setup properly by responding with an HTTP status code of 200, but it will also obtain the necessary auth credentials in order for the bot to post messages in the future. 
    ```js
    {!> code-samples/team-messaging/bot-app.js [ln:50-73] !}
    ```
	In the last step above, we invoke a function to subscribe to the events our bot will be listening for.
    ```js
    {!> code-samples/team-messaging/bot-app.js [ln:78-90,98-102] !}
    ```

## Step 5. Send your first message to the bot

Now login to the [RingCentral Team Messaging developer sandbox](https://app.devtest.ringcentral.com) using your sandbox credentials and start a chat with the bot you installed. 

<img src="../../manual/bot-start-chat.png" class="img-fluid">

Then, within the chat you just created, type something to the bot. 

<img src="../../manual/bot-devtest.png" class="img-fluid">

You will notice immediately that the bot does not yet respond to your message. We will update your bot in the final step to send a message in response. 

??? note "Discussion: observe the console of your local bot server"
    Turn your attenion to your local console to see the output from your server. You will see a trace of the process so far. 
	The first shows your server subscribing to the necessary events.
    ```
	> developing-locally-with-glip@0.0.1 start
    > node app.js
    Bot server listening on port 3000
    Verifying redirect URL for bot server.
    Subscribing to post and group events
    Verifying webhook.
    Subscription Response:  {
      uri: 'https://platform.devtest.ringcentral.com/restapi/v1.0/subscription/1bbb4073-8235-4fe1-8730-0c535ea1364f',
      id: '1bbb4073-8235-4fe1-8730-0c535ea1364f',
      creationTime: '2021-09-13T23:32:57.921Z',
      status: 'Active',
      eventFilters: [
        '/restapi/v1.0/subscription/~?threshold=60&interval=15',
        '/restapi/v1.0/glip/posts',
        '/restapi/v1.0/glip/groups'
      ],
      expirationTime: '2021-09-20T23:32:56.921Z',
      expiresIn: 604798,
      deliveryMode: {
        transportType: 'WebHook',
        encryption: false,
        address: 'https://5de7-162-207-206-200.ngrok.io/callback'
      }
    }
    ```
	Next, you will see your bot being adding to a chat with yourself. 
    ```
    Webhook received:  {
      uuid: '828140854147437394',
      event: '/restapi/v1.0/glip/groups',
      timestamp: '2021-09-13T23:33:20.705Z',
      subscriptionId: '1bbb4073-8235-4fe1-8730-0c535ea1364f',
      ownerId: '304027004',
      body: {
        id: '725327874',
        name: null,
        description: null,
        type: 'PrivateChat',
        status: 'Active',
        members: [ '302434004', '304027004' ],
        isPublic: null,
        creationTime: '2021-09-13T23:33:20.130Z',
        lastModifiedTime: '2021-09-13T23:33:20.130Z',
        eventType: 'GroupJoined'
      }
    }
    ```
	Finally, you will see the message you sent to your bot in the last step.
    ```
    Webhook received:  {
      uuid: '6696560186430840563',
      event: '/restapi/v1.0/glip/posts',
      timestamp: '2021-09-13T23:33:23.079Z',
      subscriptionId: '1bbb4073-8235-4fe1-8730-0c535ea1364f',
      ownerId: '304027004',
      body: {
        id: '5341265924',
        groupId: '725327874',
        type: 'TextMessage',
        text: 'ping',
        creatorId: '302434004',
        addedPersonIds: null,
        creationTime: '2021-09-13T23:33:22.858Z',
        lastModifiedTime: '2021-09-13T23:33:22.858Z',
        attachments: null,
        activity: null,
        title: null,
        iconUri: null,
        iconEmoji: null,
        mentions: null,
        eventType: 'PostAdded'
      }
    }
	```

## Step 6. Modify the sample application to respond to a message

In the final step, we will modify the sample application to respond to a message you send the bot. Begin by editing `app.js` in your favorite editor. Edit the post handler for `/callback` as shown below to create your own bot commands. The example below responds to the message "ping" with another message "pong."

```js
{!> code-samples/team-messaging/bot-app.js [ln:78-102] !}
```

## Summary

This guide has walked you through the creation of a simple bot server using Javascript. The bot server itself is rudimentary, but should help to understand the basic underlying components and functions your bot server will be responsible for. If you are a Javascript developer, be sure to checkout RingCentral's [Javascript bot framework](../node/) which provides a more full-featured bot server in a box. 

## Up next: adaptive cards

In part two of this developer's guide, we will extend this basic bot to include the functionality of posting adaptive cards and responding to interactive messaging events. 

<a class="btn btn-primary" href="../posting-cards/">Continue to part 2</a>
