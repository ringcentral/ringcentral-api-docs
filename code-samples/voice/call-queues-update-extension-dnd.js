const RingCentral = require('@ringcentral/sdk').SDK

var rcsdk = new RingCentral({ server: "server_url", clientId: "client_id", clientSecret: "client_secret" });
var platform = rcsdk.platform();

platform.login({ username: "username", password: "password", extension: "extension_number" })

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
