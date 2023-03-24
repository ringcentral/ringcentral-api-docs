const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

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
