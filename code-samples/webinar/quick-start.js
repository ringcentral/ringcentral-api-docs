const RC = require('@ringcentral/sdk').SDK

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, function(e){
    create_webinar()
});

async function create_webinar(){
    try {
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
