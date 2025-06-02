var platform = require('./../quick-start.js').platform;

read_user_fac_state_rules()





// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    read_user_fac_state_rules()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Read existing rules
*/
async function read_user_fac_state_rules() {
  try {
    let endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls'
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    await update_user_fac_state_rules(jsonObj.dispatching)
  } catch (e) {
    console.log("Unable to read user FAC state rules. ", e.message);
  }
}

/*
* Update rules with new values
*/
async function update_user_fac_state_rules(dispatching){
  try {
    // Find the "TerminatingAction" object from the dispatching actions list
    let action = dispatching.actions.find(a => a.type == "TerminatingAction")
    if (action){
      // Change the terminating target type
      action.terminatingTargetType = "PlayAnnouncementTerminatingTarget"
      let bodyParams = {
        dispatching: dispatching
      }
      let endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls'
      var resp = await platform.patch(endpoint, bodyParams)
      var jsonObj = await resp.json()
      console.log(JSON.stringify(jsonObj, null, 4))
    }
  } catch (e) {
    console.log("Unable to update user FAC state rules. ", e.message);
  }
}
