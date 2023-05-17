var platform = require('./../quick-start.js').platform;
detect_sms_feature()





// Next line must be at the 10th line!
/* Authenticate a user using a personal JWT token */
platform.on(platform.events.loginSuccess, function(e){
    detect_sms_feature()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Read phone number(s) that belongs to the authenticated user and detect if a phone number
  has the SMS capability
*/
async function detect_sms_feature(){
  try {
      let endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
      var resp = await platform.get(endpoint)
      var jsonObj = await resp.json()
      for (var record of jsonObj.records){
          for (feature of record.features){
              if (feature == "SmsSender")
                console.log(`This phone number ${record.phoneNumber} has SMS feature`)
          }
      }
      if (jsonObj.records.length == 0)
        console.log("This user does not own a phone number!")
  } catch(e) {
      console.log(e.message)
  }
}
