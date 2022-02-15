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
