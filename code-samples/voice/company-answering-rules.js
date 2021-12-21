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

platform.on(platform.events.loginSuccess, function(response) {
  create_company_custom_answering_rule();
});

async function create_company_custom_answering_rule() {
  var params = {
    enabled: true,
    type: "Custom",
    name: "Company off time",
    callHandlingAction: "Disconnect",
  };
  try {
    var resp = await platform.post(
      "/restapi/v1.0/account/~/answering-rule",
      params
    );
    var jsonObj = await resp.json();
    console.log(jsonObj);
  } catch (e) {
    console.log(e.message);
  }
}
