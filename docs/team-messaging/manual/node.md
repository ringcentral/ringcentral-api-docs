no_breadcrumb:true

# How to build a RingCentral bot using Javascript

This guide will take you through the process of building your first bot using RingCentral's [Javascript Bot Framework](https://github.com/ringcentral/ringcentral-chatbot-js). The bot we will build is very simple, but will help demonstrate the basic design pattern of setting up a server to respond to a user speaking to the bot via RingCentral team messaging. Let's begin!

## Setup Your Project

To begin, create a project directory and install some prerequisites.

```bash
% mkdir my-bot
% cd my-bot
% yarn add ringcentral-chatbot sqlite3
% yarn add --dev dotenv ngrok
% touch db.sqlite
```

## Start a Proxy

Bots operate via a server which RingCentral communicates with over HTTP. To enable RingCentral to send messages to the bot you are building on your local development machine, we need to setup a proxy/tunnel first. 

```bash
$ ./node_modules/.bin/ngrok http 3000
```

When the proxy has started, you will see something similar to the following:

<img src="../ngrok.png" class="img-fluid" />

Make note of the https forwarding URL, we will use that later when configuring your bot. 

## Create an App

With our proxy running, we now have all the information we need to create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Bot App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

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
    <li>Edit Extensions</li>
    <li>Glip</li>
    <li>Read Accounts</li>
    <li>Webhook Subscriptions</li>
  </ul>
  </li>
</ol>
</div>

### Enter your Redirect URI

Upon clicking the Create Bot App button, you will be taken to a form to complete the app creation process. Be sure to enter in the Redirect URI using the address of your proxy, with `/bot/oauth` appended to the end. For example:

<img src="../redirecturi.png" class="img-fluid" style="max-width: 600px" />

When you are done, you will be taken to the app's dashboard. Make note of your app's Client ID and Client Secret. We will be using those in the next step.

## Create and edit .env

Create a file called `.env` in your project folder. Then copy and paste the contents below. Be sure to add/substitute values accordingly.

```bash hl_lines="5 6 7 8"
RINGCENTRAL_SERVER=https://platform.devtest.ringcentral.com
RINGCENTRAL_CHATBOT_ADMIN_USERNAME=admin
RINGCENTRAL_CHATBOT_ADMIN_PASSWORD=admin
RINGCENTRAL_CHATBOT_EXPRESS_PORT=3000
RINGCENTRAL_CHATBOT_CLIENT_ID=<ENTER CLIENT ID FOR BOT APP>
RINGCENTRAL_CHATBOT_CLIENT_SECRET=<ENTER CLIENT SECRET FOR BOT APP>
RINGCENTRAL_CHATBOT_SERVER=<ENTER NGROK URL OF YOUR LOCAL SERVER>
RINGCENTRAL_CHATBOT_DATABASE_CONNECTION_URI=<FULL PATH TO db.sqlite>
```

!!! tip "Configuring your database"
    In a subsequent step we will be initializing a simple SQLite database. Before we can do that, we need to tell the bot framework where to find your database file. When you setup your project directory above, you touched a file called `db.sqlite`. In your `.env` file, enter the full and complete path to that file. The URL will look like this (the three forward slashed "///" is intentional): 

    `RINGCENTRAL_CHATBOT_DATABASE_CONNECTION_URI=sqlite:///full/path/to/my-bot/db.sqlite`

## Create your bot server

We are now ready for the code to power your bot. Create a file called `express.js` in your project folder using the contents below.

```javascript
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

## Start your bot server

The code above is all you need to create a simple RingCentral bot. Let's start your bot server.

```bash
$ node -r dotenv/config express.js
```

## Initialize your database

With your bot server running, let's continue the setup process by initializing your database. This is done by calling a URL running on your bot server like so:

```bash
$ curl -X PUT -u admin:admin https://<CHATBOT_SERVER>/admin/setup-database
```

## Add your bot to RingCentral

Login to your [Developer Console](https://developer.ringcentral.com/), click on your bot in the application listing, and navigate to the Bot tab. Then click the button labeled "Add to RingCentral."

<img class="img-fluid" src="../add-to-glip.png" style="max-width: 600px">

Then follow the on-screen instructions and pick a name for your bot.

## Test Your Bot

Your bot will appear as a user inside of the RingCentral App. Login to the [RingCentral Team Messaging sandbox](https://glip.devtest.ringcentral.com/) and start a chat with the bot app you just added.

Type "ping" and see what happens. If successful, the bot should respond simply with "pong." 

## Publish Your App

Congratulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
