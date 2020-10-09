const RC = require('@ringcentral/sdk').SDK

var rcsdk = new RC({ server: "server_url", clientId: "client_id", clientSecret: "client_secret" });
var platform = rcsdk.platform();

platform.login({ username: "username", password: "password", extension: "extension_number" })

platform.on(platform.events.loginSuccess, async function(e) {
  var resp = await platform.get('/restapi/v1.0/account/~/extension/~/message-store', {
    messageType: ['SMS']
  })
  var jsonObj = await resp.json()
  console.log(jsonObj)
});