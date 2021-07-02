# How to build a RingCentral bot from scratch

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
% ngrok http 3000
```

If every thing goes well you should see the following screen.

<img src="../../../img/ngrok-running.png" class="img-fluid" style="max-width: 400px">

Make note of your https forwarding URL, we will use that shortly when creating your config file. 

## Step 2. Create a bot application

With our proxy running, we now have all the information we need to create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Bot App" button below. 

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Chatbot+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+chat+bot+on+RingCentral&public=false&type=ServerBot&carriers=7710,7310,3420&permissions=ReadAccounts,SubscriptionWebhook,Glip,EditExtensions&redirectUri=" class="btn btn-primary">Create Bot App</a>
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


## Step 3. Clone the sample application

To help you get started, we have a sample application that stubs out much of what you will need to create. Clone this Github repository like so:

```bash
% git clone https://github.com/pkvenu/ringcentral-bot-demo.git
% cd ringcentral-bot-demo
```

## Step 4. Setup and start the bot server

Ok, the basics are in place. Now it is time to build your bot server using node. The repository you cloned above has all the prerequisites you will need specified in `package.json`. Install them by running the following command:

```bash
% npm install
```

Next, copy the contents of `.env.template` to `.env`.

```bash
% cp .env.template .env
```

Edit the `.env` you just created and enter in the values for `CLIENT_ID` and `CLIENT_SECRET` that you received when you created the bot in the RingCentral Developer Console above. Then, set `REDIRECT_HOST` to your ngrok server URL. I would look something like this:
   
<img src="../envfile.png" class="img-fluid" style="max-width: 500px">

Finally, launch your server.

```bash
npm start
```

## Step 5. Add the bot to your RingCentral account

Return to the Developer Console and navigate to the "Bot" tab for the app you recently created. Click on the "Add to RingCentral" button.

<img class="img-fluid" src="../add-to-ringcentral.png" style="max-width: 600px">

This will install the bot into your Developer Sandbox. When a bot is installed, RingCentral will attempt to verify that the bot server is running by sending it a quick message to the OAuth redirect URI.

At the same time it will transmit auth credentials necessary for making future API calls. RingCentral will transmit an authorization code for public apps, and an access key for private apps.

```js
{!> code-samples/team-messaging/bot-app.js [ln:50-80] !}
```

!!! info "The bot provisioner will only use the first URL specificed in the oAuth settings."

<img src="../../../img/authorization.png" class="img-fluid" style="max-width: 300px">

The access token obtained is a `permanent` access token. It's the developer responsibility to manage this access token. For public applications this would mean storing the bot token in a database and mapping to a customerId. They would then use the customerId to retrieve the access token before posting back to RingCentral.

## Step 6. Subscribe to webhooks

We can now subscribe to RingCentral events using the code below:

```js
{!> code-samples/team-messaging/bot-app.js [ln:111-134] !}
```

## Step 7. Talk to the bot

Now login to `https://app.devtest.ringcentral.com` using your sandbox credentials and search for the bot name. Click on the bot name and type in "Hi" to start communicating with it.

<img src="../../../img/bot_devtest.png" class="img-fluid">

## Step 8. Receive webhook notifications

When a person joins or leaves a team, or when a message is posted to a team, you should now receive an event from RingCentral which will be displayed in your console or in your ngrok inspector. 

```json
{
    "timestamp": "2017-03-21T18:29:27.408+0000",
    "subscriptionId": "a45645-0001-cc71-9de3-674476722",
    "uuid": "b11c9430-9687-4498-b12b-3fcb470bfe04",
    "event": "/restapi/v1.0/glip/posts",
    "body": {
        "eventType": "PostAdded",
        "id": "0000001",
        "type": "TextMessage",
        "text": "Hi!",
        "creatorId": "123456789",
        "groupId": "1234",
        "creationTime": "2017-03-21T18:29:20Z",
        "lastModifiedTime": "2017-03-21T18:29:27Z"
    }
}
```

## Summary

With events now being delivered to your bot server, you can begin [posting messages](../posting/) back to the team to build your conversational interface.

This guide has walked you through the creation of a simple bot server using Javascript. The bot server itself is rudimentary, but should help to understand the basic underlying components and functions your bot server will be responsible for. If you are a Javascript developer, be sure to checkout RingCentral's [Javascript bot framework](../node/) which provides a more full-featured bot server in a box. 
