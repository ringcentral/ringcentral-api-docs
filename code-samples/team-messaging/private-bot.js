/*
This is a sample bot application for RingCentral. Learn more about this
app by following the instructions found at the URL below:
https://developers.ringcentral.com/guide/team-messaging/bots/walkthrough/

Copyright: 2021 - RingCentral, Inc.
License: MIT
*/
require('dotenv').config();

var RingCentral = require('@ringcentral/sdk').SDK;

var express = require('express');
var bp      = require('body-parser')
var fs      = require('fs');

// read in config parameters from environment, or .env file
const PORT            = process.env.PORT;
const RINGCENTRAL_CLIENT_ID       = process.env.RINGCENTRAL_CLIENT_ID_PRIVATE;
const RINGCENTRAL_CLIENT_SECRET   = process.env.RINGCENTRAL_CLIENT_SECRET_PRIVATE;
const RINGCENTRAL_SERVER_URL = process.env.RINGCENTRAL_SERVER_URL;
const RINGCENTRAL_OAUTH_REDIRECT_URI = process.env.RINGCENTRAL_OAUTH_REDIRECT_URI
const WEBHOOKS_DELIVERY_ADDRESS = process.env.WEBHOOKS_DELIVERY_ADDRESS

const TOKEN_TEMP_FILE = '.private-bot-auth';
const SUBSCRIPTION_ID_TEMP_FILE = '.private-bot-subscription';

var app = express();

app.use( bp.json() );
app.use( bp.urlencoded({
  extended: true
}));

// Start our server
app.listen(PORT, function () {
    console.log("Bot server listening on port " + PORT);
    loadSavedTokens()
});

// This route handles GET requests to our root ngrok address and responds
// with the same "Ngrok is working message"
app.get('/', function(req, res) {
    res.send('Ngrok is working! Path Hit: ' + req.url);
});

// Instantiate the RingCentral JavaScript SDK
var rcsdk = new RingCentral({
  server: RINGCENTRAL_SERVER_URL,
  clientId: RINGCENTRAL_CLIENT_ID,
  clientSecret: RINGCENTRAL_CLIENT_SECRET,
  redirectUri: RINGCENTRAL_OAUTH_REDIRECT_URI
});

var platform = rcsdk.platform();

// Bot starts/restarts => check if there is a saved token
async function loadSavedTokens(){
  if (fs.existsSync( TOKEN_TEMP_FILE )) {
    console.log( "Load saved access token")
    var savedTokens = JSON.parse( fs.readFileSync( TOKEN_TEMP_FILE ) );
    console.log( "Reuse saved access token")
    await platform.auth().setData( savedTokens );
    if (fs.existsSync( SUBSCRIPTION_ID_TEMP_FILE )){
      var subscriptionId = fs.readFileSync(SUBSCRIPTION_ID_TEMP_FILE)
      checkWebhooksSubscription(subscriptionId)
    }else
      subscribeToEvents()
  }else{
    console.log("Your bot has not been installed or the saved access token was lost!")
    console.log("Login to developers.ringcentral.com, open the bot app and install it by selecting \
the Bot menu and at the 'General Settings' section, click the 'Add to RingCentral' button.")
    console.log("Note: If the bot was installed, remove it and reinstall to get a new access token")
  }
}


// Handle authentication for a private bot
//
// When a private bot is installed, RingCentral sends an access token to the bot
// via an HTTP POST request through the specified redirect url. When the bot receives
// the access token, it can use the token to post messages to bot users.
//
// In this tutorial, we store the access token in a file so that we can reuse it
// every time we terminate and restart the bot.

// If the access token is lost, you will need to remove and reinstall the bot in order
// to obtain a new access token.

// In a real production implementation, the acess token should be saved in a more secure
// place and persistent so that it can be reliably re-used if the bot is restarted.
app.post('/oauth', async function (req, res) {
  console.log("Private bot being installed");
  if (req.body.access_token) {
    res.status(200).send('')
    // Bot access token is almost permanent. Thus, there is no need for a refresh token!
    // For calling RC Team Messaging API to post messages using the RingCentral JS SDK, we need
    // to create a token object and set it to the SDK's platform instance.

    // First, we get an empty token object from the platform instance, then we assign the
    // access token, the token type and other fake values to satify the SDK's tokens syntax.
    var tokenObj = platform.auth().data();
    tokenObj.access_token = req.body.access_token;
    tokenObj.token_type = "bearer"
    tokenObj.expires_in = 100000000000;
    tokenObj.refresh_token = 'xxx';
    tokenObj.refresh_token_expires_in = 10000000000;

    // Finally, we set the token object back to the platform instance and also save it to a file
    // for reuse.
    await platform.auth().setData(tokenObj);
    console.log( "Save tokens to a local file for reuse" )
    fs.writeFileSync( TOKEN_TEMP_FILE, JSON.stringify( tokenObj ) )

    console.log("Bot installation done")
    // The bot must subscribe for Team Messaging events notification so that it can receive messages
    // and other important events notification from bot users and from RingCentral server.
    subscribeToEvents()
  }else{
    res.status(401).end()
  }
});

// Callback method received after subscribing to webhook. This method handles webhook
// notifications and will be invoked when a user sends a message to your bot, and when
// the bot is added to/removed from a group or a team etc.
app.post('/webhook-callback', async function (req, res) {
  var validationToken = req.get('Validation-Token');
  if (validationToken) {
    console.log('Verifying Webhook token.');
    res.setHeader('Validation-Token', validationToken);
  } else if (req.body.event == "/restapi/v1.0/subscription/~?threshold=60&interval=15") {
    console.log("Renewing subscription ID: " + req.body.subscriptionId);
    renewSubscription(req.body.subscriptionId);
  } else if (req.body.body.eventType == "PostAdded") {
    var body = req.body.body
    console.log("Received user's message: " + body.text);
    console.log(req.body)
    if (req.body.ownerId == body.creatorId) {
      console.log("Ignoring message posted by bot.");
    } else if (body.text == "ping") {
      send_message( body.groupId, "pong" )
    // Add more bot commands here by training your bot to respond to different keywords
    //} else if (req.body.body.text == "some keyword") {
      // send_message( body.groupId, "reply message" )
    } else if (body.text == "hello") {
      var card = make_hello_world_card(null)
      send_card( body.groupId, card )
    } else {
      var message = `I do not understand ${body.text}`
      send_message( body.groupId, message )
    }
  } else if (req.body.body.eventType == 'Delete'){
    console.log('Bot is being uninstalled by a user => clean up resources')
    // Bot is being uninstalled by a user => clean up resouce
    // delete subscription
    var resp = await platform.delete(`/restapi/v1.0/subscription/${req.body.subscriptionId}`)
    // clear local database
    fs.unlinkSync(TOKEN_TEMP_FILE)
    fs.unlinkSync(SUBSCRIPTION_ID_TEMP_FILE)
  } else {
    console.log("Event type:", req.body.body.eventType)
    console.log(req.body.body)
  }
  res.status(200).end();
});

// Method to Subscribe for events notification.
async function subscribeToEvents(){
  console.log("Subscribing to posts and groups events")
  var requestData = {
    eventFilters: [
      "/restapi/v1.0/glip/posts", // Team Messaging (a.k.a Glip) events.
      "/restapi/v1.0/glip/groups", // Team Messaging (a.k.a Glip) events.
      "/restapi/v1.0/account/~/extension/~", // Subscribe for this event to detect when a bot is uninstalled
      "/restapi/v1.0/subscription/~?threshold=60&interval=15" // For subscription renewal
    ],
    deliveryMode: {
      transportType: "WebHook",
      address: WEBHOOKS_DELIVERY_ADDRESS
    },
    expiresIn: 604799
  };
  try {
    var resp = await platform.post('/restapi/v1.0/subscription', requestData)
    var jsonObj = await resp.json()
    console.log('Team Messaging events notifications subscribed successfully.');
    // Save the subscription id to a file so that we can check its status every time the
    // bot is restarted.
    fs.writeFileSync( SUBSCRIPTION_ID_TEMP_FILE, jsonObj.id )
    console.log('Your bot is ready for conversations ...');
  }catch (e) {
    console.error('Team Messaging events notifications subscription failed. ', e);
    throw e;
  }
}

async function renewSubscription(id){
  console.log("Auto subscription renewal");
  try{
    var resp = await platform.post(`/restapi/v1.0/subscription/${id}/renew`)
    var jsonObj = await resp.json()
    console.log("Subscription renewed. Next renewal:" + jsonObj.expirationTime);
  }catch(e) {
    console.log("Subscription renewal failed: ", e);
    throw e;
  }
}

// Check Webhook subscription status
async function checkWebhooksSubscription(subscriptionId) {
  try {
    var resp = await platform.get(`/restapi/v1.0/subscription/${subscriptionId}`)
    var jsonObj = await resp.json()
    if (jsonObj.status == 'Active') {
      console.log("Webhooks subscription is still active.")
      console.log('Your bot is ready for conversations ...');
    }else{
      fs.unlinkSync(SUBSCRIPTION_ID_TEMP_FILE)
      console.log("Webhooks subscription status", jsonObj.status)
      console.log("Create new Webhooks subscription")
      subscribeToEvents()
    }
  }catch(e) {
    console.error(e.message);
    throw e;
  }
}

// This handler is called when a user submit data from an adaptive card
app.post('/user-submit', function (req, res) {
    console.log( "Received card event." )
    var body = req.body
    if (body.data.path == 'new-card'){
      var card = make_new_name_card( body.data.hellotext )
      send_card( body.conversation.id, card)
    }else if (body.data.path == 'update-card'){
      var card = make_hello_world_card( body.data.hellotext )
      update_card( body.card.id, card )
    }
    res.status(200).end();
});

// Post a message to a chat
async function send_message( groupId, message ) {
    console.log("Posting response to group: " + groupId);
    try {
      await platform.post(`/restapi/v1.0/glip/chats/${groupId}/posts`, {
  	     "text": message
       })
    }catch(e) {
	    console.log(e)
    }
}

// Send an adaptive card to a chat
async function send_card( groupId, card ) {
    console.log("Posting a card to group: " + groupId);
    try {
      var resp = await platform.post(`/restapi/v1.0/glip/chats/${groupId}/adaptive-cards`, card)
	  }catch (e) {
	    console.log(e)
	  }
}

// Update an adaptive card
async function update_card( cardId, card ) {
    console.log("Updating card...");
    try {
      var resp = await platform.put(`/restapi/v1.0/glip/adaptive-cards/${cardId}`, card)
    }catch (e) {
	    console.log(e.message)
	  }
}

function make_hello_world_card(name) {
    var card = {
    	type: "AdaptiveCard",
    	$schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    	version: "1.3",
    	body: [
        {
      		type: "TextBlock",
      		size: "Medium",
      	  weight: "Bolder",
      		text: "Hello World"
        },
        {
      		type: "TextBlock",
      		text: "Enter your name in the field below so that I can say hello.",
      		wrap: true
        },
        {
      		type: "Input.Text",
      		id: "hellotext",
      		placeholder: "Enter your name"
        },
        {
          type: "ActionSet",
          actions: [
            {
              type: "Action.Submit",
              title: "Send a new card",
              data: {
                path: "new-card"
              }
            },
            {
              type: "Action.Submit",
              title: "Update this card",
              data: {
                path: "update-card"
              }
            }
          ]
        }
      ]
    }
    if (name){
      card.body.push({
          type: "Container",
          separator: true,
          items: [
            {
              type: "TextBlock",
            	text: `Hello ${name}`,
            	wrap: true
            }
          ]
        })
    }
    return card
}

function make_new_name_card(name) {
    return {
    	"type": "AdaptiveCard",
    	"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    	"version": "1.3",
    	"body": [
        {
      		"type": "TextBlock",
      		"size": "Medium",
      		"weight": "Bolder",
      		"text": "Hello World"
        },
        {
      		"type": "TextBlock",
      		"text": `Hello ${name}`,
      		"wrap": true
        }
    	]
    }
}
