const RC  = require('@ringcentral/sdk').SDK
require('dotenv').config();

CLIENTID     = process.env.RC_CLIENT_ID
CLIENTSECRET = process.env.RC_CLIENT_SECRET
SERVER       = process.env.RC_SERVER_URL
JWT          = process.env.RC_JWT

var rcsdk = new RC({
    server:       SERVER,
    clientId:     CLIENTID,
    clientSecret: CLIENTSECRET
});
var platform = rcsdk.platform();
platform.login({
    'jwt':  JWT
})

platform.on(platform.events.loginSuccess, async function(e) {
  var resp = await platform.get('/restapi/v1.0/account/~/extension/~/message-store', {
    messageType: ['SMS']
  })
  var jsonObj = await resp.json()
  console.log(jsonObj)
});
