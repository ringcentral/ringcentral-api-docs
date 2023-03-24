const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, async function(response) {
  get_call_queues()
});

async function get_call_queues() {
  try {
    var resp = await platform.get('/restapi/v1.0/account/~/call-queues')
    var jsonObj = await resp.json()
    for (var group of jsonObj.records) {
      if (group.name == "Support Department") {
        add_new_members(group.id)
        break
      }
    }
  } catch (e) {
    console.log(e.message)
  }
}

async function add_new_members(groupId) {
  var params = {
    addedExtensionIds: ["888888888", "999999999"]
  }
  try {
    var resp = await platform.post('/restapi/v1.0/account/~/call-queues/' + groupId + '/bulk-assign', params)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  } catch (e) {
    console.log(e.message)
  }
}
