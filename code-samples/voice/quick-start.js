const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

RECIPIENT    = process.env.RINGOUT_RECIPIENT
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
  call_ringout()
})

async function call_ringout() {
  try {
    var resp = await platform.post('/restapi/v1.0/account/~/extension/~/ring-out', {
      'from': { 'phoneNumber': USERNAME },
      'to': { 'phoneNumber': RECIPIENT },
      'playPrompt': false
    })
    var jsonObj = await resp.json()
    console.log("Call placed. Call status: " + jsonObj.status.callStatus)
  } catch (e) {
    console.log(e.message)
  }
}
