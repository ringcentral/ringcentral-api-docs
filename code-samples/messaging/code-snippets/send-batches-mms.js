var platform = require('./../quick-start.js').platform;
var RECIPIENT    = require('./../quick-start.js').RECIPIENT;

read_extension_phone_number_detect_mms_feature()




// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    read_extension_phone_number_detect_mms_feature()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Read phone number(s) that belongs to the authenticated user and detect if a phone number
  has the SMS capability
*/
async function read_extension_phone_number_detect_mms_feature(){
  try {
      let endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
      var resp = await platform.get(endpoint)
      var jsonObj = await resp.json()
      for (var record of jsonObj.records){
          for (feature of record.features){
              if (feature == "MmsSender"){
                // If a user has multiple phone numbers, check and decide which number
                // to be used for sending the message batch.
                return await send_batch_mms(record.phoneNumber)
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
 Broadcast a text message with image to multiple recipients
*/
async function send_batch_mms(fromNumber) {
  try{
    const FormData = require('form-data');
    formData = new FormData();
    let bodyParams = {
      from: { phoneNumber: fromNumber },
      text: "Introducing our new WinterFlex Jacket! Stay warm and stylish this season. Enjoy 20% off this week only. Shop now!",
      messages: [
        { to: [ { phoneNumber: "Recipient-1-Phone-Number" } ] },
        { to: [ { phoneNumber: "Recipient-2-Phone-Number" } ] },
        { to: [ { phoneNumber: "Recipient-N-Phone-Number" } ] }
      ]
    }
    formData.append('metadata', JSON.stringify(bodyParams), { contentType: 'application/json' });
    formData.append('attachments', require('fs').createReadStream('winterflex-jacket.png'), "winterflex-jacket.png");

    let endpoint = "/restapi/v2/accounts/~/extensions/~/sms/batches"
    var resp = await platform.post(endpoint, formData)
    var jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj, null, 4))
  }catch(e){
    console.log(e.message)
  }
}
