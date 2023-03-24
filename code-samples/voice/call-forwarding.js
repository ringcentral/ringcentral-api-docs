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
