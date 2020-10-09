const RingCentral = require('@ringcentral/sdk').SDK

var rcsdk = new RingCentral({ server: "server_url", clientId: "client_id", clientSecret: "client_secret" });
var platform = rcsdk.platform();

platform.login({ username: "username", password: "password", extension: "extension_number" })

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