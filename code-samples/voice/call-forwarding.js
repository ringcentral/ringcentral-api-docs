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
