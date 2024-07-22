const RC = require('@ringcentral/sdk').SDK

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, function(e){
    register_user_for_webinar()
});

async function register_user_for_webinar(){
    try {
	console.log('fetching preference...')
	var sessionId = '<INSERT SESSION ID>'
	var endpoint = '/webinar/registration/v1/sessions/'+sessionId+'/registrants'
	platform.post(endpoint, {
	    'firstName': 'Luke',
	    'lastName': 'Skywalker',
	    'email': 'luke.skywalker@jedi.org',
	    'externalId': 1,
	    'source': 'website-campaign-123'
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
