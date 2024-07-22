const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, function(response) {
  read_active_calls()
});

async function read_active_calls() {
  try {
    var resp = await platform.get('/account/~/extension/~/active-calls', {
      view: 'Simple'
    })
    var jsonObj = await resp.json()
    for (var record of jsonObj.records)
      console.log("Call result: " + record.result)
  } catch (e) {
    console.log(e.message)
  }
}
