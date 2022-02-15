const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

CLIENTID     = process.env.RC_CLIENT_ID
CLIENTSECRET = process.env.RC_CLIENT_SECRET
SERVER       = process.env.RC_SERVER_URL
USERNAME     = process.env.RC_USERNAME
PASSWORD     = process.env.RC_PASSWORD
EXTENSION    = process.env.RC_EXTENSION

var rcsdk = new RC({
    server:       SERVER,
    clientId:     CLIENTID,
    clientSecret: CLIENTSECRET
});
var platform = rcsdk.platform();
platform.login({
    username:  USERNAME,
    password:  PASSWORD,
    extension: EXTENSION
})

platform.on(platform.events.loginSuccess, () => {
  get_personal_meeting_id()
})

async function get_personal_meeting_id() {
    console.log("Getting personal chat")
    var endpoint = "/restapi/v1.0/glip/chats"
    var params = {
	type: 'Personal'
    }
    try {
	var resp = await platform.get( endpoint, params )
	var json = await resp.json()
	var chat_id = json['records'][0]['id']
	console.log("Personal chat ID: " + chat_id)
    } catch (e) {
        console.log("Error: " + e.message);
    }
}
