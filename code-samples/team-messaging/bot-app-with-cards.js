/*
This is a sample bot application for RingCentral. Learn more about this
app by following the instructions found at the URL below:
https://developers.ringcentral.com/guide/team-messaging/bots/walkthrough/

Copyright: 2021 - RingCentral, Inc.
License: MIT
*/
require('dotenv').config();

const RC    = require('@ringcentral/sdk').SDK
var express = require('express');
var request = require('request');
var bp      = require('body-parser')
var fs      = require('fs');

const REDIRECT_HOST   = process.env.REDIRECT_HOST;
const TOKEN_TEMP_FILE = '.bot-auth';

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

var app = express();
var subscription, rcsdk, subscriptionId, bot_token;

app.use( bp.json() );
app.use( bp.urlencoded({
  extended: true
}));

// Start our server
app.listen(process.env.PORT, function () {
    console.log("Bot server listening on port " + process.env.PORT);
});

// This route handles GET requests to our root ngrok address and responds
// with the same "Ngrok is working message"
app.get('/', function(req, res) {
    res.send('Ngrok is working! Path Hit: ' + req.url);
});

if (fs.existsSync( TOKEN_TEMP_FILE )) {
    var data = JSON.parse( fs.readFileSync( TOKEN_TEMP_FILE ) );
    console.log( "Reusing access key from cache: " + data.access_token )
    platform.auth().setData( data );
}

// Handle authorization for public bots
//
// When a public bot is installed, RingCentral transmits an auth token
// via an HTTP GET. Here the bot receives the token and then uses that
// token to login() to RingCentral to exchange the token for an access key.
// Then the bot subscribes to webhooks so that it can respond to message
// events.
//
// This server stores that key in memory. As a result, if the server is
// restarted, you will need to remove and reinstall the not in order to obtain
// a fresh API token. In a more advanced implementation, the acess key would
// be persisted so that it can easily be re-used if the server is restarted.
app.get('/oauth', function (req, res) {
    console.log("Public bot being installed");
    if (!req.query.code){
        res.status(500).send({"Error": "No authorization token received."}).end();
        console.log("RingCentral did not transmit an authorizaton token.");
    } else {
        var creatorId = req.query.creator_extension_id;
        platform.login({
            code : req.query.code,
            redirectUri : REDIRECT_HOST + '/oauth'
        }).then(function(authResponse){
	    subscribeToEvents();
        }).catch( function(e){
            console.error(e)
	    res.status(500).send("Error installing bot and subscribing to events: ", e).end()
        })
    }
    res.status(200).send("").end();
});

// Handle authorization for public bots
//
// When a private bot is installed, RingCentral transmits a permanent access key
// to the bot via an HTTP POST.
//
// Then the bot subscribes to webhooks so that it can respond to message
// events.
//
// This server stores that key in memory. As a result, if the server is
// restarted, you will need to remove and reinstall the not in order to obtain
// a fresh API token. In a more advanced implementation, the acess key would
// be persisted so that it can easily be re-used if the server is restarted.
app.post('/oauth', function (req, res) {
    res.status(200);
    if (req.body.access_token) {
	console.log("Verifying redirect URL for bot server.")

	// Normally, the access token in the SDK is set by the login()
	// method. Here, we bypass the login method to set the access
	// token directly.
	var data = platform.auth().data();
	data.token_type = "bearer"
	data.expires_in = 100000000000;
	data.access_token = req.body.access_token;
	data.refresh_token = 'xxx';
	data.refresh_token_expires_in = 10000000000;
	platform.auth().setData(data);

	console.log( "Stashing access key: " + req.body.access_token )
	fs.writeFileSync( TOKEN_TEMP_FILE, JSON.stringify( data ) )

	try {
            subscribeToEvents();
	} catch(e) {
	    res.status(500).send("Error: ", e).end();
	}
    }
    res.send("").end()
});

// Callback method received after subscribing to webhook
// This method handles webhook notifications and will be invoked when a user
// types a message to your bot.
app.post('/callback', function (req, res) {
    var validationToken = req.get('Validation-Token');
    var body = [];
    if (validationToken) {
        console.log('Verifying webhook.');
        res.setHeader('Validation-Token', validationToken);

    } else if (req.body.event == "/restapi/v1.0/subscription/~?threshold=60&interval=15") {
	console.log("Renewing subscription ID: " + req.body.subscriptionId);
        renewSubscription(req.body.subscriptionId);

    } else if (req.body.body.eventType == "PostAdded") {
        console.log("Received message: " + req.body.body.text);
        if (req.body.ownerId == req.body.body.creatorId) {
            console.log("Ignoring message posted by bot.");
        } else if (req.body.body.text == "ping") {
            send_message( "pong", req.body.body.groupId )
        } else if (req.body.body.text == "hello") {
            send_card( hello_world_card(), req.body.body.groupId )
        } else {
            send_message( "I do not understand '" +
                req.body.body.text +
                "'", req.body.body.groupId )
        }
    }
    res.statusCode = 200;
    res.end('');
});

// Post a message to a chat
function send_message( msg, group ) {
    console.log("Posting response to group: " + group);
    platform.post('/team-messaging/v1/chats/'+group+'/posts', {
	"text": msg
    }).catch( function (e) {
	console.log(e)
    });
}

function send_card( card, group ) {
    console.log("Posting card to group: " + group);
    platform.post('/team-messaging/v1/chats/'+group+'/adaptive-cards', card)
	.catch( function (e) {
	    console.log(e)
	});
}

// This handler is called when a user submit data from an adaptive card
app.post('/msg-callback', function (req, res) {
    console.log( "Receiving webhook about message interaction." )
    update_card( req.body.conversation.id,
		 req.body.card.id,
		 hello_name_card( req.body.data.hellotext ) )
    res.statusCode = 200;
    res.end('');
});

function update_card( group, card, content ) {
    console.log("Updating card...");
    platform.put('/team-messaging/v1/adaptive-cards/'+card, content)
	.catch( function (e) {
	    console.log(e)
	});
}

// Method to Subscribe to Team Messaging Events.
function subscribeToEvents(token){
    console.log("Subscribing to post and group events")
    var requestData = {
        "eventFilters": [
            "/restapi/v1.0/glip/posts",
            "/restapi/v1.0/glip/groups",
            "/restapi/v1.0/subscription/~?threshold=60&interval=15"
        ],
        "deliveryMode": {
            "transportType": "WebHook",
            "address": REDIRECT_HOST + "/callback"
        },
        "expiresIn": 604799
    };
    platform.post('/subscription', requestData)
        .then(function (subscriptionResponse) {
            console.log('Subscription Response: ', subscriptionResponse.json());
            subscriptionId = subscriptionResponse.id;
        }).catch(function (e) {
            console.error('There was a problem subscribing to events. ', e);
            throw e;
    });
}

function renewSubscription(id){
    console.log("Renewing Subscription");
    platform.post('/subscription/' + id + "/renew")
        .then(function(response){
            var data = JSON.parse(response.text());
            console.log("Subscription renewed. Next renewal:" + data.expirationTime);
        }).catch(function(e) {
	    console.log("Error subscribing to bot events: ", e);
            throw e;
        });
}


function hello_world_card() {
    var HELLO_CARD = {
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
		"text": "Enter your name in the field below so that I can say hello.",
		"wrap": true
            },
            {
		"type": "Input.Text",
		"id":"hellotext",
		"placeholder": "Enter your name"
            }
	],
	"actions": [
            {
		"type": "Action.Submit",
		"title": "Say Hello"
            }
	]

    }
    return HELLO_CARD
}

function hello_name_card(name) {
    var HELLO_CARD = {
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
		"text": "Hello " + name,
		"wrap": true
            }
	]
    }
    return HELLO_CARD
}
