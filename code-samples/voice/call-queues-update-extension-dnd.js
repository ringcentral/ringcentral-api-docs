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
  update_extension_dnd_status()
});

async function update_extension_dnd_status(){
  try {
    var params = {
      dndStatus: "DoNotAcceptDepartmentCalls"
    }
    var resp = await platform.put(`/restapi/v1.0/account/~/extension/~/presence`, params)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  }catch(e){
    console.log(e.message)
  }
}
