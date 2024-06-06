var platform = require('./../quick-start.js').platform;


list_user_sms_template()




// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    create_user_sms_template()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Create a personal reusable SMS template
*/
async function create_user_sms_template(){
  try {
      let endpoint = "/restapi/v1.0/account/~/extension/~/message-store-templates"
      let bodyParams = {
            displayName: "Weekly meeting reminder",
            body: {
              text: "Please update your slides before the meeting."
          }
    }
    var resp = await platform.post(endpoint, bodyParams)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  } catch(e) {
    console.log("Unable to create a user SMS template.", e.message)
  }
}

/*
  List personal reusable SMS templates
*/
async function list_user_sms_template(){
  try {
    let endpoint = "/restapi/v1.0/account/~/extension/~/message-store-templates"
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    console.log(jsonObj)
    for (var record of jsonObj.records){
      console.log(record)
    }
  } catch(e) {
    console.log("Unable to list user SMS templates.", e.message)
  }
}
