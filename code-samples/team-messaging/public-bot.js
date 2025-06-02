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
const RINGCENTRAL_CLIENT_ID       = process.env.RINGCENTRAL_CLIENT_ID_PUBLIC;
const RINGCENTRAL_CLIENT_SECRET   = process.env.RINGCENTRAL_CLIENT_SECRET_PUBLIC;
const RINGCENTRAL_SERVER_URL = process.env.RINGCENTRAL_SERVER_URL;
const RINGCENTRAL_OAUTH_REDIRECT_URI = process.env.RINGCENTRAL_OAUTH_REDIRECT_URI
const WEBHOOKS_DELIVERY_ADDRESS = process.env.WEBHOOKS_DELIVERY_ADDRESS

const TOKEN_TEMP_FILE = '.public-bot-auth';
const SUBSCRIPTION_ID_TEMP_FILE = '.public-bot-subscription';

var app = express();

app.use( bp.json() );
app.use( bp.urlencoded({
  extended: true
}));

// Start our server
app.listen(PORT, function () {
    console.log("Bot server listening on port " + PORT);
    // Bot start/restart, check if there are saved tokens
    loadSavedTokens()
});

// This route handles GET requests to our root ngrok address and responds
// with the same "Ngrok is working message"
app.get('/', function(req, res) {
    res.send('Ngrok is working! Path Hit: ' + req.url);
});

// Instantiate the RingCentral JavaScript SDK
var rcsdk = new RingCentral({
  server: process.env.RC_SERVER_URL,
  clientId: process.env.RC_APP_CLIENT_ID,
  clientSecret: process.env.RC_APP_CLIENT_SECRET,
  redirectUri: process.env.RC_REDIRECT_URI
});

// Keep a list of account's access tokens in memory so we can use them to post messages
// to users belong the same account accordingly.
var accountTokens = []

async function loadSavedTokens(){
  if (fs.existsSync( TOKEN_TEMP_FILE )) {
    accountTokens = JSON.parse( fs.readFileSync( TOKEN_TEMP_FILE ) );
    if (accountTokens.length){
      console.log( "Load saved accounts' tokens")
      for (var account of accountTokens){
        var platform = rcsdk.platform()
        await platform.auth().setData( account.tokens );
        await checkWebhooksSubscription(platform, account)
      }
      return
    }
  }

  console.log("Your bot has not been installed or the saved access token was lost!")
  console.log("Login to developers.ringcentral.com, open the bot app and install it by selecting \
the Bot menu and at the 'General Settings' section, click the 'Add to RingCentral' button.")
  console.log("Note: If the bot was installed, remove it and reinstall to get a new access token")
}

// Handle authorization for public bots
//
// When a public bot is installed, RingCentral sends an authorization code to the bot via
// an HTTP GET request through the specified redirect url. When the bot receives
// the authorization code, it must uses the code to exchange for an access token.

// In this tutorial, we store the access tokens in a file so that we can reuse it
// every time we terminate and restart the bot.

// If the access token of a user's account is lost, the customer will need to reinstall
// the bot in order for the bot to obtain a new access token for that account.

// In a real production implementation, the acess token should be saved in a more secure
// place and persistent so that it can be reliably re-used if the bot is restarted.
app.get('/oauth', async function (req, res) {
    console.log("Public bot being installed");
    if (!req.query.code){
        res.status(500).send({"Error": "Authorization code is missing."})
        console.log("RingCentral did not send an authorizaton code.");
    } else {
        var creatorId = req.query.creator_extension_id;
        try {
          var params = {
              code : req.query.code,
              redirectUri : process.env.RC_REDIRECT_URL
          }
          var platform = rcsdk.platform()
          var resp = await platform.login(params)
          // Get bot access token. The tokens is per user's account
          var tokens = await resp.json()

          // Get user's account id. The account id will be used to identify a public user so that we
          // can use the correct access token to post messages to users under that account.
          var resp1 = await platform.get('/restapi/v1.0/account/~/extension/~')
          var jsonObj = await resp1.json()

          // Bot access token is almost permanent. Thus, there is no refresh token associated with the access token!
          // However, before saving the access token for reuse, we assign fake refresh token values to satify
          // the SDK's tokens syntax.
        	tokens['refresh_token'] = 'xxx';
        	tokens['refresh_token_expires_in'] = 10000000000;

          // Make an account token object for reuse
          var accountTokenObj = {
            ownerId: tokens.owner_id, // Bot extension id
            accountId: jsonObj.account.id, // User account id
            tokens: tokens,
            subscriptionId: ''
          }
          // Add this new token object to our accountTokens array
          accountTokens.push(accountTokenObj)
          res.status(200).send("")
          console.log("Subscribe to Webhooks notification")
          // The bot must subscribe for Team Messaging notifications so that it can receive messages
          // from RingCentral server and from bot users.
  	      subscribeToEvents(platform, accountTokenObj);
        }catch(e){
          console.error(e.message)
	        res.status(500).send({"Error": "Installing bot and subscribing to events failed."})
        }
    }
});

// Callback method received after subscribing to webhook. This method handles webhook
// notifications and will be invoked when a user sends a message to your bot, and when
// the bot is added to/removed from a group or a team etc.
app.post('/webhook-callback', async function (req, res) {
    var validationToken = req.get('Validation-Token');
    var body = [];
    if (validationToken) {
        console.log('Verifying webhook token.');
        res.setHeader('Validation-Token', validationToken);
    } else if (req.body.event == "/restapi/v1.0/subscription/~?threshold=60&interval=15") {
	     console.log("Renewing subscription ID: " + req.body.subscriptionId);
       var account = accountTokens.find(o => o.ownerId == req.body.ownerId)
       if (account){
         var platform = rcsdk.platform()
         await platform.auth().setData(account.tokens)
         renewSubscription( platform, req.body.subscriptionId);
      }
    } else if (req.body.body.eventType == "PostAdded") {
      // get the account's token object
      var account = accountTokens.find(o => o.ownerId == req.body.ownerId)
      if (account){
        var platform = rcsdk.platform()
        await platform.auth().setData(account.tokens)
        var body = req.body.body
        console.log("Received user's message: " + body.text);
        console.log(req.body)
        if (req.body.ownerId == body.creatorId) {
          console.log("Ignoring message posted by bot.");
        } else if (body.text == "ping") {
          send_message( platform, body.groupId, "pong" )
        // Add more bot commands here by training your bot to respond to different keywords
        //} else if (req.body.body.text == "some keyword") {
          // send_message( body.groupId, "reply message" )
        } else if (body.text == "hello") {
          var card = make_hello_world_card(null)
          send_card( platform, body.groupId, card )
        } else {
          var message = `I do not understand ${body.text}`
          send_message( platform, body.groupId, message )
        }
      }
    } else if (req.body.body.eventType == 'Delete'){
      console.log('Bot is being uninstalled by a user => clean up resources')
      // Bot is being uninstalled by a customer => clean up resouce
      var index = accountTokens.findIndex(c => c.ownerId === req.body.ownerId)
      if (index >= 0 ){
        // get the account's token object
        var account = accountTokens[index]
        // remove this account from the accountTokens list and update local file/database
        accountTokens.splice(index, 1)
        fs.writeFileSync( TOKEN_TEMP_FILE, JSON.stringify( accountTokens ) )
        console.log("Removed saved token of this customer account")
      }
    } else {
      console.log("Event type:", req.body.body.eventType)
      console.log(req.body.body)
    }
    res.status(200).end();
});

// Method to Subscribe for events notification.
async function subscribeToEvents(p, accountTokenObj){
    console.log("Subscribing to posts and groups events")
    var requestData = {
        "eventFilters": [
            "/team-messaging/v1/posts", // Team Messaging (a.k.a Glip) Events.
            "/team-messaging/v1/chats", // Team Messaging (a.k.a Glip) Events.
            "/restapi/v1.0/account/~/extension/~", // Subscribe for this event to detect when a bot is uninstalled
            "/restapi/v1.0/subscription/~?threshold=60&interval=15" // For subscription renewal
        ],
        "deliveryMode": {
            "transportType": "WebHook",
            "address": process.env.WEBHOOK_DELIVERY_ADDRESS
        },
        "expiresIn": 604799
    };
    try {
      var resp = await p.post('/restapi/v1.0/subscription', requestData)
      var jsonObj = await resp.json()
      console.log('Team Messaging events notifications subscribed successfully.');
      accountTokenObj.subscriptionId = jsonObj.id

      // Save tokens to a file so that we can reuse the access token after we terminate and
      // restart the bot.
      fs.writeFileSync( TOKEN_TEMP_FILE, JSON.stringify( accountTokens ) )
      console.log('Your bot is ready for conversations ...');
    }catch (e) {
      console.error('Team Messaging events notifications subscription failed. ', e);
      throw e;
    }
}

async function renewSubscription(p, id){
    console.log("Auto subscription renewal");
    try{
      var resp = await p.post(`/restapi/v1.0/subscription/${id}/renew`)
      var jsonObj = await resp.json()
      console.log("Subscription renewed. Next renewal:" + jsonObj.expirationTime);
    }catch(e) {
	    console.log("Subscription renewal failed: ", e);
      throw e;
    }
}

async function checkWebhooksSubscription(p, account) {
  try {
    var resp = await p.get(`/restapi/v1.0/subscription/${account.subscriptionId}`)
    var jsonObj = await resp.json()
    if (jsonObj.status == 'Active') {
      console.log("Webhooks subscription is still active.")
      console.log('Your bot is ready for conversations ...');
    }else{
      console.log("Webhooks subscription status", jsonObj.status)
      console.log("Create new Webhooks subscription")
      await subscribeToEvents(p, account)
    }
  }catch(e) {
    console.error(e.message);
    throw e;
  }
}

// This handler is called when a user submit data from an adaptive card
app.post('/user-submit', async function (req, res) {
    console.log( "Received card event." )
    res.status(200).end()
    var body = req.body
    // get the account's token object
    var account = accountTokens.find(o => o.accountId == body.user.accountId)
    if (account){
      console.log("Customer account found", account.accountId)
      var platform = rcsdk.platform()
      await platform.auth().setData(account.tokens)
      if (body.data.path == 'new-card'){
        var card = make_new_name_card( body.data.hellotext )
        send_card( platform, body.conversation.id, card)
      }else if (body.data.path == 'update-card'){
        var card = make_hello_world_card( body.data.hellotext )
        update_card( platform, body.card.id, card )
      }
    }
});

// Post a message to a chat
async function send_message( p, groupId, message ) {
    console.log("Posting response to group: " + groupId);
    try {
      await p.post(`/team-messaging/v1/chats/${groupId}/posts`, {
  	     "text": message
       })
     }catch(e) {
      console.log(e)
    }
}

// Send an adaptive card to a chat
async function send_card( p, groupId, card ) {
    console.log("Posting a card to group: " + groupId);
    try {
      var resp = await p.post(`/team-messaging/v1/chats/${groupId}/adaptive-cards`, card)
    }catch (e) {
      console.log(e)
    }
}

// Update an adaptive card
async function update_card( p, cardId, card ) {
    console.log("Updating card...");
    try {
      var resp = await p.put(`/team-messaging/v1/adaptive-cards/${cardId}`, card)
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
