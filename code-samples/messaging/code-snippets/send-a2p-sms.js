var platform = require('./../quick-start.js').platform;
var RECIPIENT    = require('./../quick-start.js').RECIPIENT;

read_extension_phone_number_detect_a2psms_feature()




// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    read_extension_phone_number_detect_a2psms_feature()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Read phone number(s) that belongs to the authenticated user and detect if a phone number
  has the A2P SMS capability
*/
async function read_extension_phone_number_detect_a2psms_feature(){
  try {
      let endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
      var resp = await platform.get(endpoint)
      var jsonObj = await resp.json()
      for (var record of jsonObj.records){
          for (feature of record.features){
              if (feature == "A2PSmsSender"){
                // If a user has multiple phone numbers, check and decide which number
                // to be used for sending text message.
                return await send_batch_sms(record.phoneNumber)
              }
          }
      }
      if (jsonObj.records.length == 0)
        console.log("This user does not own a phone number!")
      else
        console.log("None of this user's phone number(s) has A2P SMS capability!")
  } catch(e) {
      console.log(e.message)
  }
}

/*
 Broadcast a text message from a user own phone number to multiple recipients
*/
async function send_batch_sms(fromNumber) {
    try{
        let bodyParams = {
            from: fromNumber,
            text: "Hello Team",
            messages: [
          		{ to: [RECIPIENT] },
              // Adding more recipients
              /*
              { to: [ "Recipient-2-Phone-Number" ] },
              { to: [ "Recipient-N-Phone-Number" ] }
              */
            ]
        }
        let endpoint = "/restapi/v1.0/account/~/a2p-sms/batches"
        var resp = await platform.post(endpoint, bodyParams)
        var jsonObj = await resp.json()
        console.log("Batch sent. Batch id: " + jsonObj.id)
        check_batch_status(jsonObj.id)
    }catch(e){
        console.log(e.message)
    }
}

/*
 Send a batch from a user own phone number to multiple recipient with personalized message
*/
async function send_personalized_sms(fromNumber) {
    try{
        let bodyParams = {
            from: fromNumber,
            // This text becomes the default text and can be obmitted, if the text in a recipient object is not specified, this text will be used
            text: "Hello Team",
            messages: [
          		{ to: [RECIPIENT], text: "Hello Alice" },
              // Adding more recipients
              /*
              { to: [ "Recipient-2-Phone-Number" ], text: "Hello Bob" },
              { to: [ "Recipient-N-Phone-Number" ], text: "Hola Maria" }
              */
            ]
        }
        let endpoint = "/restapi/v1.0/account/~/a2p-sms/batches"
        var resp = await platform.post(endpoint, bodyParams)
        var jsonObj = await resp.json()
        console.log("Batch sent. Batch id: " + jsonObj.id)
        check_batch_status(jsonObj.id)
    }catch(e){
        console.log(e.message)
    }
}

/*
 Check the batch status until it's completed.
 Sending a large batch will take some time for the server to complete. You can read a batch status using the batch id returned in the response after sending a batch.
*/
async function check_batch_status(batchId){
  try {
      let endpoint = `/restapi/v1.0/account/~/a2p-sms/batches/${batchId}`
      let resp = await platform.get(endpoint);
      let jsonObj = await resp.json()
      console.log("Batch status: ", jsonObj.status)
      if (jsonObj.status != "Completed"){
        await sleep (5000);
        check_batch_status(jsonObj.id);
      }else{
        console.log(jsonObj)
      }
  } catch (e) {
    console.log(e.message)
  }
}

const sleep = async (ms) => {
  await new Promise(r => setTimeout(r, ms));
}
