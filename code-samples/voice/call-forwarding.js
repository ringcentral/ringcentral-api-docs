const RingCentral = require('@ringcentral/sdk').SDK

var rcsdk = new RingCentral({ server: "server_url", clientId: "client_id", clientSecret: "client_secret" });

var platform = rcsdk.platform();

platform.login({ username: "username", password: "password", extension: "extension_number" })

platform.on(platform.events.loginSuccess, function(response) {
  create_forwarding_number_by_number()
});

async function create_forwarding_number_by_number() {
  try {
    var resp = await platform.post('/restapi/v1.0/account/~/extension/~/forwarding-number', {
      phoneNumber: "11235557890",
      type: "Other",
      label: "My ATT number"
    })
    var jsonObj = await resp.sjon()
    console.log("Forwarding number created.")
    console.log("Forwarding number id: " + jsonObj.id)
  } catch (e) {
    console.log(e.message)
  }
}