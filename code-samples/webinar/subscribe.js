const RC = require('@ringcentral/sdk').SDK

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, function(e){
    subscribe_to_webinar_webhook()
});

async function subscribe_to_webinar_webhook(){
    try {
	console.log('fetching preference...')
	var webinarId   = '<INSERT WEBINAR ID>'
	var eventFilter = '/webinar/configuration/v1/company/sessions?webinarId=' + webinarId
	var webhookUrl  = 'https://acme.com/app/webhooks'
	var endpoint    = '/webinar/notifications/v1/subscriptions'
	platform.post(endpoint, {
	    "eventFilters": [
		eventFilter
	    ],
	    "deliveryMode": {
		"transportType": "WebHook",
		"address": webhookUrl
	    },
	    "expiresIn": 100000
	})
        .then(function(resp) {
          return resp.json()
        })
        .then(function (json) {
            console.log('Response: ', json )
        });
    } catch(e) {
        console.log("An error occured: ", e.message)
        process.exit(1)
    }
});
