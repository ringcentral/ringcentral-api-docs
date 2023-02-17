const SDK = require('@ringcentral/sdk').SDK
require('dotenv').config();

RINGCENTRAL_CLIENTID     = process.env.RINGCENTRAL_CLIENTID
RINGCENTRAL_CLIENTSECRET = process.env.RINGCENTRAL_CLIENTSECRET
RINGCENTRAL_SERVER       = process.env.RINGCENTRAL_SERVER
RINGCENTRAL_USERNAME     = process.env.RINGCENTRAL_USERNAME
RINGCENTRAL_EXTENSION    = process.env.RINGCENTRAL_EXTENSION
RINGCENTRAL_PASSWORD     = process.env.RINGCENTRAL_PASSWORD

var rcsdk = new SDK({
    server: RINGCENTRAL_SERVER,
    clientId: RINGCENTRAL_CLIENTID,
    clientSecret: RINGCENTRAL_CLIENTSECRET
});
var platform = rcsdk.platform();
platform.login({
    username: RINGCENTRAL_USERNAME,
    password: RINGCENTRAL_PASSWORD,
    extension: RINGCENTRAL_EXTENSION
})

platform.on(platform.events.loginSuccess, function(e){
    create_webinar()
});

async function create_webinar(){
    try {
	console.log('fetching preference...')
	platform.post('/webinar/configuration/v1/webinars', {
	    title: "My first webinar",
	    description: "This webinar was created via the Webinar Quick Start guide for developers"
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
