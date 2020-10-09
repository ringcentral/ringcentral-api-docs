const RingCentral = require('@ringcentral/sdk').SDK

var rcsdk = new RingCentral({ server: "server_url", clientId: "client_id", clientSecret: "client_secret" });
var platform = rcsdk.platform();

platform.login({ username: "username", password: "password", extension: "extension_number" })

platform.on(platform.events.loginSuccess, function(response) {
  create_user_custom_rule()
});

async function create_user_custom_rule() {
  var params = {
    enabled: true,
    type: "Custom",
    name: "My weekly meetings",
    schedule: {
      weeklyRanges: {
        monday: [{ from: "09:00", to: "10:00" }],
        friday: [{ from: "10:00", to: "15:00" }]
      }
    },
    callHandlingAction: "TakeMessagesOnly"
  }
  try {
    var resp = await platform.post('/restapi/v1.0/account/~/extension/~/answering-rule', params)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  } catch (e) {
    console.log(e.message)
  }
}