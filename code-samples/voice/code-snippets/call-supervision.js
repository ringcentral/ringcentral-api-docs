var platform = require('./../quick-start.js').platform;
let supervisorDeviceId = "802636634016"
let agentExtensionId = "62295327016"
read_agent_active_calls(agentExtensionId, supervisorDeviceId)




// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, async () => {
    let supervisorDeviceId = "TEST-SUPERVISOR-DEVICEID"
    let agentExtensionId = "TEST-AGENT-EXTENSIONID"
    await read_agent_active_calls(agentExtensionId, supervisorDeviceId)
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Read agent active calls
*/

async function read_agent_active_calls(agentExtensionId, supervisorDeviceId){
  try{
    let endpoint = `/restapi/v1.0/account/~/extension/${agentExtensionId}/active-calls`
    let resp = await platform.get(endpoint)
    let jsonObj = await resp.json()
    for (var record of jsonObj.records){
      if (record.result == "In Progress"){
        submit_call_supervise_request(record.telephonySessionId, agentExtensionId, supervisorDeviceId)
        break
      }
    }
  }catch(e) {
    console.log("Unable to read agent's active calls.", e.message)
  }
}

/*
* Supervise an active call session
*/
async function submit_call_supervise_request(telephonySessionId, agentExtensionId, supervisorDeviceId){
  try{
    let endpoint = `/restapi/v1.0/account/~/telephony/sessions/${telephonySessionId}/supervise`
    var bodyParams = {
            mode: 'Listen',
            supervisorDeviceId: supervisorDeviceId,
            agentExtensionId: agentExtensionId
          }
    let resp = await platform.post(endpoint, bodyParams)
    let jsonObj = await resp.json()
    console.log(jsonObj)
  }catch(e) {
    console.log("Unable to supervise this call.", e.message)
  }
}
