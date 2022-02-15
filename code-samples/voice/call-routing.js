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
