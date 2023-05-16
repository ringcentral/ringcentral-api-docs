var platform = require('./../quick-start.js').platform;
var RECIPIENT    = require('./../quick-start.js').RECIPIENT;
read_extension_phone_number_detect_mms_feature()





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
  has the MMS capability
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
                // to be used for sending MMS message.
                return await send_mms(record.phoneNumber)
              }
          }
      }
      if (jsonObj.records.length == 0)
        console.log("This user does not own a phone number!")
      else
        console.log("None of this user's phone number(s) has MMS capability!")
  } catch(e) {
      console.log(e.message)
  }
}

/*
 Send a multi-media message from a user own phone number to a recipient number
*/
async function send_mms(fromNumber){
    var FormData = require('form-data');
    formData = new FormData();
    var bodyParams = {
        from: { phoneNumber: fromNumber },
        to: [{ phoneNumber: RECIPIENT }],
        // To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
        /*
        to: [
           { phoneNumber: "Recipient1-Phone-Number" },
           { phoneNumber: "Recipient2-Phone-Number" }
         ],
        */
        text: 'Hello World'
    }
    // Attach the bodyParams to multipart form data
    formData.append('json', new Buffer.from(JSON.stringify(bodyParams)), {
        contentType: 'application/json'
    });
    // Attach a media file to multipart form data
    formData.append('attachment', require('fs').createReadStream('test.jpg'));
    try {
      let endpoint = "/restapi/v1.0/account/~/extension/~/mms"
      var resp = await platform.post(endpoint, formData)
      var jsonObj = await resp.json()
      console.log("MMS sent. Message id: " + jsonObj.id)
      check_mms_message_status(jsonObj.id)
    } catch (e){
      console.log(e.message)
    }
}

/*
 Check the sending message status until it's out of the queued status
*/
async function check_mms_message_status(messageId){
  try {
      let endpoint = `/restapi/v1.0/account/~/extension/~/message-store/${messageId}`
      let resp = await platform.get(endpoint);
      let jsonObj = await resp.json()
      console.log("Message status: ", jsonObj.messageStatus)
      if (jsonObj.messageStatus == "Queued"){
        await sleep (5000);
        check_mms_message_status(jsonObj.id);
      }
  } catch (e) {
    console.log(e.message)
  }
}

const sleep = async (ms) => {
  await new Promise(r => setTimeout(r, ms));
}
