const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

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
