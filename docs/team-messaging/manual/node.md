no_breadcrumb:true

# Build a Glip Bot Using Node

This guide will take you through the process of building your first bot for Glip using RingCentral's [Javascript Glip Bot Framework](https://github.com/ringcentral/ringcentral-chatbot-js). Let's begin! 

## Setup Your Project

To begin, create a project directory and install some prerequisites.

```bash
$ mkdir my-bot
$ cd my-bot
$ yarn add ringcentral-chatbot sqlite3
$ yarn add --dev dotenv ngrok
```

## Start a Proxy

Bots operate via a server which RingCentral communicates with. To allow RingCentral to send messages to your bot, we need to setup a proxy/tunnel first.

```bash
$ ./node_modules/.bin/ngrok http 3000
```

When the proxy has started, you will see a screen on which is a URL you will need to make note of.

<img src="../ngrok.png" class="img-fluid" />

## Create an App

With our proxy running, we now have all the information we need to create an app in the RingCentral Developer Portal. This can be done quickly by clicking the "Create Chat Bot App" button below. Just click the button, enter a name and description if you choose, and click the "Create" button. If you do not yet have a RingCentral account, you will be prompted to create one.

<a target="_new" href="https://developer.ringcentral.com/new-app?name=Chatbot+Quick+Start+App&desc=A+simple+app+to+demo+creating+a+chat+bot+on+RingCentral&public=false&type=ServerOther&carriers=7710,7310,3420&permissions=SubscriptionWebhook,Glip,EditExtensions&redirectUri=" class="btn btn-primary">Create Chat Bot App</a>
<a class="btn-link btn-collapse" data-toggle="collapse" href="#create-app-instructions" role="button" aria-expanded="false" aria-controls="create-app-instructions">Show detailed instructions</a>

<div class="collapse" id="create-app-instructions">
<ol>
<li><a href="https://developer.ringcentral.com/login.html#/">Login or create an account</a> if you have not done so already.</li>
<li>Go to Console/Apps and click 'Create App' button.</li>
<li>Select "Bot App for Team Messaging" under "What type of app are you creating?"</li>
<li>Select "Other Non-UI" under "Where will you be calling the API from?"
<li>Select "Only members of my organization/company" under "Who will be authorized to access your app?"
<li>On the second page of the create app wizard, enter your app's name and description. Then select the following permissions:
  <ul>
    <li>Glip</li>
    <li>Webhook Subscriptions</li>
    <li>Edit Extensions</li>
  </ul>
  </li>
<li>Leave "OAuth Redirect URI" blank for now. We will come back and edit that later.</li>
</ol>
</div>

!!! info "Enter your Redirect URI"
    Upon clicking the Create Bot App button, you will be taken to a form to complete the app creation process. Be sure to enter in the Redirect URI using the address of your proxy.
    <img src="../redirecturi.png" class="img-fluid" />

When you are done, you will be taken to the app's dashboard. Make note of the Client ID and Client Secret. We will be using those momentarily.

## Edit .env

Create a file called `.env` in your project folder. Then copy and paste the contents below. Be sure to add/substitute values accordingly.

```bash hl_lines="5 6 7 8"
RINGCENTRAL_SERVER=https://platform.devtest.ringcentral.com
RINGCENTRAL_CHATBOT_ADMIN_USERNAME=admin
RINGCENTRAL_CHATBOT_ADMIN_PASSWORD=admin
RINGCENTRAL_CHATBOT_EXPRESS_PORT=3000
RINGCENTRAL_CHATBOT_CLIENT_ID=
RINGCENTRAL_CHATBOT_CLIENT_SECRET=
RINGCENTRAL_CHATBOT_SERVER=https://<chatbot-server>
RINGCENTRAL_CHATBOT_DATABASE_CONNECTION_URI=
```

## Initialize Your Database

Bots need to be stateful in order to maintain webhook and notification subscriptions, and other information. In this guide we use sqlite3, which must first be initialized. Edit your `.env` and set the connection URI to a full path to a file called `db.sqlite` in your project directory.

```
RINGCENTRAL_CHATBOT_DATABASE_CONNECTION_URI=sqlite:////full/path/to/my-bot/db.sqlite
```

Then use the bot framework to setup your database.

```bash
$ curl -X PUT -u admin:admin https://<CHATBOT_SERVER>/admin/setup-database
```

## Create Your Bot

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

## Start Your Bot Server

```bash
$ node -r dotenv/config express.js
```

## Add Your Bot to Glip

Login to your [Developer Console](https://developer.ringcentral.com/), click on your bot in the application listing, and navigate to the Bot tab. Then click the button labeled "Add to Glip."

<img class="img-fluid" src="../add-to-glip.png">

Then follow the on-screen instructions.

## Test Your Bot

Your bot will appear as a user inside of Glip. Login to the [Glip sandbox](https://glip.devtest.ringcentral.com/) and start a chat with the bot app you just added to Glip.

Type "ping" and see what happens.

## Publish Your App

Congratulations on creating your first RingCentral application. The last step is to publish your application. We recommend [going through this process](../../../basics/production) for your first application so you can understand the steps to take in the future, but also to come to appreciate the care taken by RingCentral to ensure that only high-quality apps are allowed into our production environment.
