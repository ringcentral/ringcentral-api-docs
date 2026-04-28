var platform = require('./../quick-start.js').platform;
var RECIPIENT    = require('./../quick-start.js').RECIPIENT;

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
                return await send_personalized_sms(record.phoneNumber)
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
 Send personalized messages to multiple recipients
*/
async function send_personalized_sms(fromNumber) {
  try{
    let bodyParams = {
      from: { phoneNumber: fromNumber},
      text: "",
      messages: [
        {
          to: [ {phoneNumber: "Recipient-1-Phone-Number"}],
          text: "Hi Tom, your appointment with Dr. Lee is scheduled for tomorrow at 10AM."
        },
        {
          to: [ {phoneNumber: "Recipient-2-Phone-Number"} ],
          text: "Hi Jenn, your appointment with Dr. Derick is scheduled for tomorrow at 9AM."

        },
        {
          to: [ {phoneNumber: "Recipient-3-Phone-Number"} ],
          text: "Hi Laurence, your appointment with Dr. Derick is scheduled for tomorrow at 1PM."
        }
      ]
    }
    let endpoint = "/restapi/v2/accounts/~/extensions/~/sms/batches"
    var resp = await platform.post(endpoint, bodyParams)
    var jsonObj = await resp.json()
    console.log("Resp: ", JSON.stringify(jsonObj, null, 4))
  }catch(e){
    console.log(await e.response.json())
  }
}
