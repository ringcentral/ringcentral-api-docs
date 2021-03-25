require('dotenv').config();

const RC    = require('ringcentral');
var express = require('express');
var request = require('request');
var bp      = require('body-parser')

// read in config parameters from environment, or .env file
const PORT            = process.env.PORT;
const REDIRECT_HOST   = process.env.REDIRECT_HOST;
const CLIENT_ID       = process.env.CLIENT_ID;
const CLIENT_SECRET   = process.env.CLIENT_SECRET;
const RINGCENTRAL_ENV = process.env.RINGCENTRAL_ENV;

var app = express();
var platform, subscription, rcsdk, subscriptionId, bot_token;

app.use( bp.json() );
app.use( bp.urlencoded({
  extended: true
}));

// Start our server
app.listen(PORT, function () {
    console.log("Bot server listening on port " + PORT);
});

// This route handles GET requests to our root ngrok address and responds
// with the same "Ngrok is working message" we used before
app.get('/', function(req, res) {
    res.send('Ngrok is working! Path Hit: ' + req.url);
});

// instantiate the RingCentral Javascript SDK
// Be default, this will communicate with the RingCentral developer sandbox
rcsdk = new RC({
    server:    RINGCENTRAL_ENV,
    appKey:    CLIENT_ID,
    appSecret: CLIENT_SECRET
});

platform = rcsdk.platform();

// Handle authorization callbacks
// When a bot is added to an organization, a.k.a. when it is installed,
// RingCentral will authorize the bot. For private apps, RingCentral will
// transmit the access key directly. This key can be used for making other
// API calls to RingCentral, including calling the subscription API for
// subscribing to webhooks
app.post('/oauth', function (req, res) {
    if (req.body.access_token) {
        bot_token = req.body.access_token;
	console.log("Verifying redirect URL for bot server.")
        res.status(200);
        res.send("")

	// This is a bit of a hack. We are bypassing the login() method
	// of the SDK in favor of setting the access key directly.
	// The hack here is to set the refresh token to effectively a null
	// value since it is not transmitted to us.
	// There is probably a more elegant solution for this
	var data = platform.auth().data();
	data.token_type = "bearer"
	data.expires_in = 1000000
	data.access_token = bot_token
	data.refresh_token = 'xxx'
	data.refresh_token_expires_in = 1000000
	platform.auth().setData(data)    
	
	// Subscribe to webhooks relating to team messaging posts. This
	// will alert your bot when a message has been posted so the bot
	// can parse the message and respond to it. 
        subscribeToEvents( bot_token );
	// You may wish to store the bot token if you intend to re-use it
	// for other calls to the RingCentral API
	// TODO - store bot_token to make responding to future posts easier
    } else {
        res.send("")
    }
});

// Callback method received after subscribing to webhook
// This method handles webhook notifications and will be invoked when a user
// types a message to your bot. 
app.post('/callback', function (req, res) {
    var validationToken = req.get('Validation-Token');
    var body =[];
    console.log("Webhook received.")
    if(validationToken) {
        console.log('Responding to RingCentral as last leg to create new Webhook');
        res.setHeader('Validation-Token', validationToken);
        res.statusCode = 200;
        res.end();
    } else {
        req.on('data', function(chunk) {
            body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            console.log('WEBHOOK EVENT BODY: ', body);
            var obj = JSON.parse(body);
            res.statusCode = 200;
            res.end(body);
            if(obj.event == "/restapi/v1.0/subscription/~?threshold=60&interval=15"){
                renewSubscription(obj.subscriptionId);
            }
        });
    }
});

// Method to Subscribe to Glip Events.
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
            subscription = subscriptionResponse;
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
            subscriptionId = data.id
            console.log("Subscription Renewal Successfull. Next Renewal scheduled for:" + data.expirationTime);
        }).catch(function(e) {
            console.error(e);
            throw e;
        });
}
