var platform = require('./../quick-start.js').platform;
read_call_monitoring_groups()






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
  // Specify the name of a monitoring group that a supervisor can supervise
    read_call_monitoring_groups()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Read all call monitoring groups
*/
async function read_call_monitoring_groups(){
  try {
    let endpoint = "/restapi/v1.0/account/~/call-monitoring-groups"
  	let resp = await platform.get(endpoint)
  	var jsonObj = await resp.json()
  	for (var group of jsonObj.records){
      console.log(`Call monitoring group name: ${group.name}`)
      await read_call_monitoring_group_members(group.id)
  	}
  }catch (e){
    console.log("Unable to list call monitoring groups.", e.message)
  }
}

/*
* Read a call monitoring group members
*/
async function read_call_monitoring_group_members(groupId){
  try {
    let endpoint = `/restapi/v1.0/account/~/call-monitoring-groups/${groupId}/members`
  	var resp = await platform.get(endpoint)
  	var jsonObj = await resp.json()
    console.log("Call monitoring group members:")
  	for (var member of jsonObj.records){
      console.log(member)
  	}
  }catch (e){
    console.log("Unable to read members of this call monitoring group.", e.message)
  }
}
