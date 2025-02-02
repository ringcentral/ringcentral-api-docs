const RC = require('@ringcentral/sdk').SDK

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, function(e){
    invite_to_webinar()
});

async function invite_to_webinar(){
    try {
	console.log('fetching preference...')
	var webinarId = '<INSERT WEBINAR ID>'
	var sessionId = '<INSERT SESSION ID>'
	var endpoint = '/webinar/configuration/v1/webinars/'+webinarId+'/sessions/'+sessionId+'/invitees'
	platform.post(endpoint, {
	    addedInvitees: [
		{
		    'firstName': 'Leia',
		    'lastName': 'Organa',
		    'email': 'leia.organa@newrepublic.gov',
		    'role': 'Cohost',
		    'sendInvite': true
		}
		{
		    'firstName': 'Lando',
		    'lastName': 'Calrissian',
		    'email': 'lando@cloudcity.bespin.co',
		    'role': 'Panelist',
		    'sendInvite': true
		}
	    ],
	    updatedInvitees:[
		{
		    'id': '1234567',
		    'firstName': 'Grogu'
		}
	    ],
	    deletedInvitees: [
		{
		    'id': '987654'
		}
	    ]
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
