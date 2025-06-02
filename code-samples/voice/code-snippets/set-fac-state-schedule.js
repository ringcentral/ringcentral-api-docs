var platform = require('./../quick-start.js').platform;

set_user_fac_state_schedule()





// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    set_user_fac_state_schedule()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Set user forward-all-calls state schedule
*/
async function set_user_fac_state_schedule() {
  try {
    let bodyParams = {
        enabled: true,
        conditions: [ {
            type: "Schedule",
            schedule : {
              triggers: [ {
                triggerType: "Range",
                ranges: [ {
                    startDateTime: "2025-07-04T00:00:00",
                    endDateTime: "2025-07-05T08:00:00"
                  } ]
              } ]
          }
        } ]
      }
    let endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/states/forward-all-calls'
    var resp = await platform.patch(endpoint, bodyParams)
    var jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj, null, 4))
  } catch (e) {
    console.log("Unable to set user FAC state schedule", e.message);
  }
}
