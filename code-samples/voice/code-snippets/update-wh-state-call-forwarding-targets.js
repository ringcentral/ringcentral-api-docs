var platform = require('./../quick-start.js').platform;

read_user_workhours_state_rules()





// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    read_user_workhours_state_rules()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Read existing rules
*/
async function read_user_workhours_state_rules() {
  try {
    let endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours'
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    await update_user_workhours_state_rules(jsonObj.dispatching)
  } catch (e) {
    console.log("Unable to read user Work-Hours state rules. ", e.message);
  }
}

/*
* Update the Work-Hours state rules with new values
*/
async function update_user_workhours_state_rules(dispatching){
  try {
    // new phone number forwarding target
    let newTarget = {
        type: "RingGroupAction",
        enabled: true,
        targets: [
          {
            type: "PhoneNumberRingTarget",
            destination: {
                phoneNumber: "+13121234567"
            },
            name: "Temporary number"
          }
        ],
        duration: 25 // 5 rings
    }
    dispatching.actions.unshift(newTarget)

    // Update the entire dispatching configurations
    console.log(JSON.stringify(dispatching, null, 4))
    let bodyParams = {
        dispatching: dispatching
      }
    let endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours'
    var resp = await platform.patch(endpoint, bodyParams)
    var jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj, null, 4))
  } catch (e) {
    console.log("Unable to update user Work-Hours state rules. ", e.message);
  }
}
