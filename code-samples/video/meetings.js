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
  create_meeting()
})

async function create_meeting() {
    try {
	var resp = await platform.post("/rcvideo/v2/account/~/extension/~/bridges", {
            name: "Test Meeting",
            allowJoinBeforeHost: true,
            muteAudio: false,
            muteVideo: true
	})
	var json = await resp.json()
        console.log("Start Your Meeting: " + json.discovery.web)
    } catch (e) {
	console.log(e.message)
    }
}

