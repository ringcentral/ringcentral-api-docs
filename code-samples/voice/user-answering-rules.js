const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, () => {
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
