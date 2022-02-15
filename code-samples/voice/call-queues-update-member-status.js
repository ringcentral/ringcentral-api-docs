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
