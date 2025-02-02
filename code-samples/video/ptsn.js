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
  get_user_conferencing_info()
})

async function get_user_conferencing_info() {
    try {
	var resp = await platform.get('/restapi/v1.0/account/~/extension/~/conferencing')
	var jsonObj = await resp.json()
	console.log( jsonObj )
    } catch (e) {
	console.log(e.message)
    }
}
