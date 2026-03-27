var platform = require('./../quick-start.js').platform;


read_extension_phone_number_detect_sms_feature()




// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    read_extension_phone_number_detect_sms_feature()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Read phone number(s) that belongs to the authenticated user and detect if a phone number
  has the SMS capability
*/
async function read_extension_phone_number_detect_sms_feature(){
  try {
      let endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
      var resp = await platform.get(endpoint)
      var jsonObj = await resp.json()
      for (var record of jsonObj.records){
          for (feature of record.features){
              if (feature == "SmsSender"){
                // If a user has multiple phone numbers, check and decide which number
                // to be used for sending the message batch.
                let isOk = await read_sms_configurations(record)
              }
          }
      }
      if (jsonObj.records.length == 0)
        console.log("This user does not own a phone number!")
      else
        console.log("None of this user's phone number(s) has SMS capability!")
  } catch(e) {
      console.log(e.message)
  }
}
