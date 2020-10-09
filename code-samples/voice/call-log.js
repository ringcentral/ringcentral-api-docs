const RingCentral = require('@ringcentral/sdk').SDK

var rcsdk = new RingCentral({ server: "server_url", clientId: "client_id", clientSecret: "client_secret" });
var platform = rcsdk.platform();

platform.login({ username: "username", password: "password", extension: "extension_number" })

platform.on(platform.events.loginSuccess, function(response) {
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