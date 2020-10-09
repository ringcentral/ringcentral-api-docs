const RingCentral = require("@ringcentral/sdk").SDK;

var rcsdk = new RingCentral({
  server: "server_url",
  clientId: "client_id",
  clientSecret: "client_secret",
});

var platform = rcsdk.platform();

platform.login({
  username: "username",
  password: "password",
  extension: "extension_number",
});

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