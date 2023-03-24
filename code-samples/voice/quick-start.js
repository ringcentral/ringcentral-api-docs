const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

const CALLER       = process.env.RINGOUT_CALLER
const RECIPIENT    = process.env.RINGOUT_RECIPIENT

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, () => {
  call_ringout()
})

async function call_ringout() {
  try {
    var resp = await platform.post('/restapi/v1.0/account/~/extension/~/ring-out', {
      'from': { 'phoneNumber': CALLER },
      'to': { 'phoneNumber': RECIPIENT },
      'playPrompt': false
    })
    var jsonObj = await resp.json()
    console.log("Call placed. Call status: " + jsonObj.status.callStatus)
  } catch (e) {
    console.log(e.message)
  }
}
