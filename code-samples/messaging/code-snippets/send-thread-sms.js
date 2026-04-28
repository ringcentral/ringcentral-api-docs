var platform = require('./../quick-start.js').platform;
var RECIPIENT    = require('./../quick-start.js').RECIPIENT;

read_extension_phone_number_detect_sms_feature()




// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    read_shared_phone_number_detect_sms_feature()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Read the shared phone number that currently assigned to the authenticated user and detect if a phone number
  has the SMS capability
*/
async function read_shared_phone_number_detect_sms_feature(){
  try {
      let endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
      var resp = await platform.get(endpoint)
      var jsonObj = await resp.json()
      for (var record of jsonObj.records){
        // Find the "Financial Advising Queue" call queue's direct phone number
        if (record.hasOwnProperty('extension') && record.extension.name == "Financial Advising Queue"){
          for (feature of record.features){
              if (feature == "SmsSender"){
                await send_thread_message(record.phoneNumber)
                return
              }
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

/*
 Send a thread message to a recipient phone number
*/
async function send_thread_message(fromNumber) {
  try{
    let bodyParams = {
      from: { phoneNumber: fromNumber },
      to: [{ phoneNumber: "Recipient-1-Phone-Number" }],
      text: "Hi Tom ...",

    }
    let endpoint = "/restapi/v1.0/account/~/message-threads/messages"
    var resp = await platform.post(endpoint, bodyParams)
    var jsonObj = await resp.json()
    console.log("Resp: ", JSON.stringify(jsonObj, null, 4))
  }catch(e){
    console.log(e.message)
  }
}
