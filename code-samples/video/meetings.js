const RC = require('@ringcentral/sdk').SDK
const path = require('path')
// Remember to modify the path to where you saved your .env file!
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Instantiate the SDK and get the platform instance
var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();

/* Authenticate a user using a personal JWT token */
platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, function(e){
    create_meeting()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate this user. Check credentials.", e.message)
    process.exit(1)
});

/*
* Create an instant RCV meeting
*/
async function create_meeting() {
  try {
    endpoint = "/rcvideo/v2/account/~/extension/~/bridges"
    bodyParams = {
      name: "Test Meeting",
      type: "Instant"
    }
    var resp = await platform.post(endpoint, bodyParams)
    var jsonObj = await resp.json()
    console.log("Start Your Meeting: " + jsonObj.discovery.web)
  } catch (e) {
    console.log(`Unable to create an instant RCV meeting. ${e.message}`)
  }
}
