const RingCentral = require('@ringcentral/sdk').SDK

var rcsdk = new RingCentral({ server: "server_url", clientId: "client_id", clientSecret: "client_secret" });
var platform = rcsdk.platform();

platform.login({ username: "username", password: "password", extension: "extension_number" })

platform.on(platform.events.loginSuccess, async function(response) {
  update_extension_call_queue_status()
});

async function update_extension_call_queue_status(){
  try {
    var params = {
      records: [
        {
          callQueue: { id : "62376752000" },
          acceptCalls: true
        },
        {
          callQueue: { id : "62284876000" },
          acceptCalls: false
        }
       ]
    }
    var resp = await platform.put(`/restapi/v1.0/account/~/extension/~/call-queue-presence`, params)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  }catch(e){
    console.log(e.message)
  }
}
