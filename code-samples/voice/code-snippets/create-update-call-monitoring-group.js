var platform = require('./../quick-start.js').platform;
//create_call_monitoring_group("Demo group")
delete_call_monitoring_group("8121017")
//add_call_monitoring_group_members("8121017")




// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    // Specify the name of a monitoring group that a supervisor can supervise
    create_call_monitoring_group("Demo group")
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Create a call monitoring group
*/
async function create_call_monitoring_group(groupName){
  try {
    let bodyParams = {
      'name': groupName
    }
    let endpoint = "/restapi/v1.0/account/~/call-monitoring-groups"
  	let resp = await platform.post(endpoint, bodyParams)
  	var jsonObj = await resp.json()
  	console.log("Call monitoring group created:", jsonObj)
    add_call_monitoring_group_members(jsonObj.id)
  }catch (e){
    console.log("Unable to list call monitoring groups.", e.message)
  }
}

/*
* Add members to a call monitoring group
*/
async function add_call_monitoring_group_members(groupId){
  try {
    let newMembersList = await read_account_extensions()
    let bodyParams = {
      'addedExtensions': newMembersList
    }
    let endpoint = `/restapi/v1.0/account/~/call-monitoring-groups/${groupId}/bulk-assign`
  	var resp = await platform.post(endpoint, bodyParams)
    console.log("Members added.")
  }catch (e){
    console.log("Unable to add mumbers to this call monitoring group.", e.message)
  }
}

/*
* Read the account user extensions and create a list of supervisors and agents based on their role.
*/
async function read_account_extensions(){
  try {
    let queryParams = {
      'type': ['User'],
      'status': ["Enabled"]
    }
    let endpoint = "/restapi/v1.0/account/~/extension"
  	let resp = await platform.get(endpoint, queryParams)
  	var jsonObj = await resp.json()
    var extensionList = []
  	for (var user of jsonObj.records){
      var extension = {
        id: user.id,
        permissions: []
      }
      if (user.permissions.admin.enabled == true)
        extension.permissions.push("Monitoring")
      else
        extension.permissions.push("Monitored")
      extensionList.push(extension)
    }
    return extensionList
  }catch (e){
    console.log("Unable to read account extensions.", e.message)
  }
}

/*
* Delete call monitoring group
*/
async function delete_call_monitoring_group(groupId){
  try {
    let endpoint = `/restapi/v1.0/account/~/call-monitoring-groups/${groupId}`
  	var resp = await platform.delete(endpoint)
    console.log("Call monitoring group is deleted")
  }catch (e){
    console.log("Unable to delete this call monitoring group.", e.message)
  }
}
