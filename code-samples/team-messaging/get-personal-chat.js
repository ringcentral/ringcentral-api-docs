const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

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
