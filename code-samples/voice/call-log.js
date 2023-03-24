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
  read_user_calllog()
});

async function read_user_calllog() {
  try {
    var resp = await platform.get('/account/~/extension/~/call-log', {
      view: 'Detailed'
    })
    var jsonObj = await resp.json()
    for (var record of jsonObj.records)
      console.log("Call type: " + record.type)
  } catch (e) {
    console.log(e.message)
  }
}
