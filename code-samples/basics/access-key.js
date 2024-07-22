/* You get the environment parameters from your
   application dashbord in your developer account
   https://developers.ringcentral.com */

const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();
var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })
platform.on(platform.events.loginSuccess, function(e){
    print_access_key()
});
async function print_access_key() {
    var authData = await rcsdk.platform().auth().data();
    console.log('Access key: ' + authData['access_token'])
}
