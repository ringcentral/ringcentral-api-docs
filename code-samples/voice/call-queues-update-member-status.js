const RingCentral = require('@ringcentral/sdk').SDK

var rcsdk = new RingCentral({ server: "server_url", clientId: "client_id", clientSecret: "client_secret" });
var platform = rcsdk.platform();

platform.login({ username: "username", password: "password", extension: "extension_number" })

platform.on(platform.events.loginSuccess, async function(response) {
  get_call_queues()
});

async function get_call_queues() {
    try {
	var resp = await platform.get('/restapi/v1.0/account/~/call-queues')
	var jsonObj = await resp.json()
	for (var record of jsonObj.records) {
	    if (record.name == "Demo call queue"){
		await update_call_queue_member_status(record.id)
	    }
	}
    } catch (e) {
	console.log(e.message)
    }
}

async function update_call_queue_member_status(id){
  try {
    var params = {
      records: [
        {
          member: { id : "111111111" },
          acceptCurrentQueueCalls: false
        },
        {
          member: { id : "222222222" },
          acceptCurrentQueueCalls: true
        },
        {
          member: { id : "333333333" },
          acceptCurrentQueueCalls: false
        }
       ]
    }
    var resp = await platform.put(`/restapi/v1.0/account/~/call-queues/${id}/presence`, params)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  }catch(e){
    console.log(e.message)
  }
}
