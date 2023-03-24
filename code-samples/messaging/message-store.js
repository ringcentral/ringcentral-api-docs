const RC  = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});

var platform = rcsdk.platform();

platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, async function(e) {
  var resp = await platform.get('/restapi/v1.0/account/~/extension/~/message-store', {
    messageType: ['SMS']
  })
  var jsonObj = await resp.json()
  console.log(jsonObj)
});
