# Building a RingCentral bot from scratch

A RingCentral Team Messaging bot provides a conversational interface for performing common tasks. In this guide, you will learn how to build a simple ping-pong bot from scratch, giving you a closer look at the bot design pattern.

!!! tip "Try the [RingCentral bot framework](https://ringcentral.github.io/ringcentral-chatbot-js/) to get up and running faster and with less code."

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

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Chatbot+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+chat+bot+on+RingCentral&public=false&type=ServerBot&permissions=ReadAccounts,SubscriptionWebhook,TeamMessaging" class="btn btn-primary">Create Bot App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "Bot App for Team Messaging" under "What type of app are you creating?"</li>
<li>Select "Only members of my organization/company" under "Who will be authorized to access your app?"
<li>On the second page of the create app wizard, enter your app's name and description. Then select the following permissions:
  <ul>
    <li>Team Messaging</li>
    <li>Webhook Subscriptions</li>
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
$ git clone https://github.com/ringcentral-tutorials/ringcentral-bot-nodejs-demo.git
$ cd ringcentral-bot-nodejs-demo
$ npm install
```

Next, let's setup the environment and configuration of the bot. Copy the contents of `.env.template` to `.env`.

```bash
$ cp .env.template .env
```

Edit the `.env` you just created and enter in the values for `RINGCENTRAL_CLIENT_ID` and `RINGCENTRAL_CLIENT_SECRET` that you received when you created the bot in the RingCentral Developer Console above. Then, set `RINGCENTRAL_OAUTH_REDIRECT_URI` to your ngrok server URL. It would look something like this:

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

This will install the bot into your developer sandbox account. RingCentral bot installation is a procedure that RingCentral will first create a special extension (a bot extension) into the RingCentral account, in which the bot is being installed. Then RingCentral will attempt to generate an access token for the bot extension.

  - If the bot app is a private app, the access token will be generated and sent to the bot server via an HTTP POST request to the specified OAuth redirect URI.

  - If the bot app is a public app, an authorization code will be generated and sent to the bot server via an HTTP GET request to the specified OAuth redirect URI. The bot server will need to send a request to exchange the authorization code for an access token.

Both private and public bots will need the access token to subscribe for Team Messaging events notification, and to call Team Messaging API to post messages.

<img src="../../manual/bot-authorization.png" class="img-fluid" style="max-width: 400px">

The access token ultimately obtained through the above process is a *permanent* access token. This means you do not need to worry about refreshing the token after it has been issued. It is the developer's responsibility to manage and sustain the access token.

A public bot access token is per user (customer) account, this means that every time a new RingCentral account installs the bot, the authorization procedure above will be repeated to generate an access token for the new user account. Thus, a public bot server must be able to keep multiple accounts' access tokens and use the access token to interact with each user account accordingly.

??? note "Discussion: walking through the code"
    Sample code of a private bot authentication handler
    ```js
    {!> code-samples/team-messaging/private-bot.js [ln:78-122] !}
    ```
  	Sample code of a public bot authentication handler
    ```js
    {!> code-samples/team-messaging/public-bot.js [ln:80-141] !}
    ```

After getting an access token, the bot must subscribe to Team Messaging events notification in order to receive messages and important events from users and from RingCentral server.

??? note "Discussion: walking through the code"
    Sample code of a private bot subscription for Team Messaging events notification
    ```js
    {!> code-samples/team-messaging/private-bot.js [ln:116-118,165-193] !}
    ```
    Sample code of a public bot subscription for Team Messaging events notification
    ```js
    {!> code-samples/team-messaging/public-bot.js [ln:133-135,203-237] !}
    ```

??? note "Discussion: observe the console of your local bot server"
    Turn your attention to your local console to see the output from your server. You will see a trace of the process so far.
	The first shows your server subscribing to the necessary events.
    ```
	> ringcentral-bot-nodejs-demo % node private-bot
    Bot server listening on port 3000
    Your bot has not been installed or the saved access token was lost!
    Login to developers.ringcentral.com, open the bot app and install it by selecting the Bot menu and at the 'General Settings' section, click the 'Add to RingCentral' button.
    Note: If the bot was installed, remove it and reinstall to get a new access token
    Private bot being installed
    Save tokens to a local file for reuse
    Bot installation done
    Subscribing to posts and groups events
    Verifying Webhook token.
    Team Messaging events notifications subscribed successfully.
    Your bot is ready for conversations ...
    ```
	Next, you will see a few events including an event of a bot extension is created, an event of your bot being creating its personal chat room for you to join later. And an event of the bot has joined the default 'All Employees' group.
    ```
    Event type: Create
    {
      extensionId: '707406005',
      eventType: 'Create',
      hints: [ 'ExtensionInfo' ]
    }
    Event type: GroupJoined
    {
      id: '765657090',
      name: null,
      description: null,
      type: 'PersonalChat',
      status: 'Active',
      members: [ '707406005' ],
      isPublic: null,
      creationTime: '2022-01-06T18:09:50.936Z',
      lastModifiedTime: '2022-01-06T18:09:50.936Z',
      eventType: 'GroupJoined'
    }
    Event type: GroupJoined
    {
      id: '45113350',
      name: 'All Employees',
      description: null,
      type: 'Everyone',
      status: 'Active',
      members: [
        '178009004', '260981004',
        '233723004', '186478004',
        '186639004', '288101004',
        ...
      ],
      isPublic: false,
      creationTime: '2017-07-07T21:29:32.259Z',
      lastModifiedTime: '2022-01-06T18:09:13.311Z',
      eventType: 'GroupJoined'
    }
    ```

## Step 5. Send your first message to the bot
Now login to the [RingCentral app for sandbox account](https://app.devtest.ringcentral.com) using your sandbox user credentials and start a chat with the bot you installed.

<img src="../../manual/bot-start-chat.png" class="img-fluid">

Then, within the chat you just created, type 'ping' and send to the bot.

<img src="../../manual/bot-devtest.png" class="img-fluid">

You will notice that the bot responds 'pong' to your message.

??? note "Discussion: walking through the code"
    Sample code of a private bot receiving user's message and responding to the user with a message
    ```js
    {!> code-samples/team-messaging/private-bot.js [ln:124-127,135-142,166,244-253] !}
    ```
    Sample code of a public bot receiving user's message and responding to the user with a message. As you can see, the difference in a public bot is that we need to detect a user account of a user who interacts with the bot, and load the correct access token of that account to a message message back to that user accordingly.
    ```js
    {!> code-samples/team-messaging/public-bot.js [ln:143-146,160-172,201,286-296] !}
    ```

??? note "Discussion: observe the console of your local bot server"
    Turn your attention to your local console to see the output from your server. You will see more trace with the message you sent to your bot and the bot's response message in the last step.
    ```
    {
      uuid: '8987221663935761370',
      event: '/restapi/v1.0/glip/posts',
      timestamp: '2022-01-06T19:10:51.808Z',
      subscriptionId: '56b8f636-1b1a-4255-9479-84a30c0f9d23',
      ownerId: '707525005',
      body: {
        id: '5782921220',
        groupId: '765714434',
        type: 'TextMessage',
        text: 'ping',
        creatorId: '178009004',
        addedPersonIds: null,
        creationTime: '2022-01-06T19:10:51.386Z',
        lastModifiedTime: '2022-01-06T19:10:51.386Z',
        attachments: null,
        activity: null,
        title: null,
        iconUri: null,
        iconEmoji: null,
        mentions: null,
        eventType: 'PostAdded'
      }
    }
    Received user's message: ping
    Posting response to group: 765714434
    {
      uuid: '4474463302007747908',
      event: '/restapi/v1.0/glip/posts',
      timestamp: '2022-01-06T19:10:53.916Z',
      subscriptionId: '56b8f636-1b1a-4255-9479-84a30c0f9d23',
      ownerId: '707525005',
      body: {
        id: '5782929412',
        groupId: '765714434',
        type: 'TextMessage',
        text: 'pong',
        creatorId: '707525005',
        addedPersonIds: null,
        creationTime: '2022-01-06T19:10:53.022Z',
        lastModifiedTime: '2022-01-06T19:10:53.022Z',
        attachments: null,
        activity: null,
        title: null,
        iconUri: null,
        iconEmoji: null,
        mentions: null,
        eventType: 'PostAdded'
      }
    }
    Received user's message: pong
    Ignoring message posted by bot.
    ```

## Step 6. Modify the sample application to respond to more message

In the final step, we will modify the sample application to respond to your custom message sending to the bot. Begin by editing the `private-bot.js` or the `public-bot.js` in your favorite editor. Uncomment the *else if* and *send_message* lines below and give your own 'keyword' and a reply message.

```js
{!> code-samples/team-messaging/private-bot.js [ln:127,143-145,166] !}
```

## Summary

This guide has walked you through the creation of a simple bot server using Javascript. The bot server itself is rudimentary, but should help to understand the basic underlying components and functions your bot server will be responsible for. If you are a Javascript developer, be sure to checkout RingCentral's [Javascript bot framework](https://ringcentral.github.io/ringcentral-chatbot-js/) which provides a more full-featured bot server in a box.

## Up next: adaptive cards

In part two of this developer's guide, we will extend this basic bot to include the functionality of posting adaptive cards and responding to interactive messaging events.

<a class="btn btn-primary" href="../posting-cards/">Continue to part 2</a>
