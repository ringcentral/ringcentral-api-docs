const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

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
