const RingCentral = require('@ringcentral/sdk').SDK

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

CHAT_ID = '<GROUP ID>'

var rcsdk = new RingCentral({ server: RINGCENTRAL_SERVER, clientId: RINGCENTRAL_CLIENTID, clientSecret: RINGCENTRAL_CLIENTSECRET });
var platform = rcsdk.platform();
platform.login({ username: RINGCENTRAL_USERNAME, password: RINGCENTRAL_PASSWORD, extension: RINGCENTRAL_EXTENSION })

platform.on(platform.events.loginSuccess, () => {
    post_task( CHAT_ID )
})

async function post_task( group ) {
    try {
	var resp = await platform.post('/restapi/v1.0/glip/chats/'+group+'/tasks', {
	    "subject": "You need to do X",
	    "assignees": {
		"id": "<ID>"
	    },
	    "description": "In this task assignees will need to do x, y and z."
	});
	var jsonObj = await resp.json()
	console.log( JSON.stringify(jsonObj) )
    } catch (e) {
	console.log(e)
    }
}
