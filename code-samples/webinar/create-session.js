const RC = require('@ringcentral/sdk').SDK

const WEBINAR = process.env.WEBINAR_ID

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, function(e){
    create_webinar_session()
});

async function create_webinar_session(){
    try {
	let endpoint = '/webinar/configuration/v1/webinars/' + WEBINAR + '/sessions'
	platform.post(endpoint, {
	    scheduledStartTime: "2023-05-10T09:00:00.000Z",
	    scheduledDuration: 7200, // 2 hours, expressed in seconds
	    timezone: "America/New_York"
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
