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

platform.on(platform.events.loginSuccess, async function(response) {
  update_extension_call_queue_status()
});

async function update_extension_call_queue_status(){
  try {
    var params = {
      records: [
        {
          callQueue: { id : "62376752000" },
          acceptCalls: true
        },
        {
          callQueue: { id : "62284876000" },
          acceptCalls: false
        }
       ]
    }
    var resp = await platform.put(`/restapi/v1.0/account/~/extension/~/call-queue-presence`, params)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  }catch(e){
    console.log(e.message)
  }
}
