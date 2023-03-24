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
  get_user_call_answering_rules()
})

async function get_user_call_answering_rules() {
  try {
    var resp = await platform.get('/restapi/v1.0/account/~/extension/~/answering-rule', {
      'view': "Detailed",
      'enabledOnly': false
    })
    var jsonObj = await resp.json()
    for (var record of jsonObj.records) {
      get_user_call_answering_rule(record.id)
    }
  } catch (e) {
    console.log(e.message)
  }
}

async function get_user_call_answering_rule(id) {
  try {
    var resp = await platform.get('/restapi/v1.0/account/~/extension/~/answering-rule/' + id)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  } catch (e) {
    console.log(e.message)
  }
}
