const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, () => {
  fetch_personal_meeting()
})

async function fetch_personal_meeting() {
    try {
	var resp = await platform.get('/rcvideo/v2/account/~/extension/~/bridges/default');
	var jsonObj = await resp.json()
        console.log("Your personal meeting URL is: " + jsonObj.discovery.web)
    } catch (e) {
	console.log(e.message)
    }
}
