const RC = require('@ringcentral/sdk').SDK
const path = require('path')
// Remember to modify the path to where you saved your .env file!
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// For the purpose of testing the code, we put the SMS recipient number in the environment variable.
// Feel free to set the SMS recipient directly.
const RECIPIENT    = process.env.SMS_RECIPIENT

// Instantiate the SDK and get the platform instance
var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();

/* Authenticate a user using a personal JWT token */
platform.login({ 'jwt':  process.env.RC_JWT })

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
            for (var feature of record.features){
                if (feature == "SmsSender"){
                    // If a user has multiple phone numbers, check and
		    // decide which number to be used for sending
		    // the SMS message. For simplicity, we pick the
		    // first one we find. 
                    return send_sms(record.phoneNumber)
                }
            }
        }
        if (jsonObj.records.length == 0)
          console.log("This user does not own a phone number!")
        else
          console.log("None of this user's phone number(s) has the SMS capability!")
    } catch(e) {
        console.log(e.message)
        process.exit(1)
    }
}

/*
 Send a text message from a user own phone number to a recipient number
*/
async function send_sms(fromNumber){
    try {
        let bodyParams = {
            from: { phoneNumber: fromNumber },
            to: [ { phoneNumber: RECIPIENT} ],
            // To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
            /*
            to: [
               { phoneNumber: RECIPIENT },
               { phoneNumber: 'Recipient-Phone-Number' }
             ],
            */
            text: 'Hello World!'
        }
        let endpoint = "/restapi/v1.0/account/~/extension/~/sms"
        var resp = await platform.post(endpoint, bodyParams)
        var jsonObj = await resp.json()
        console.log("SMS sent. Message id: " + jsonObj.id)
        check_message_status(jsonObj.id);
    } catch(e) {
        console.log(e.message)
        process.exit(1)
    }
}

/*
 Check the sending message status until it's out of the queued status
*/
async function check_message_status(messageId){
    try {
        let endpoint = `/restapi/v1.0/account/~/extension/~/message-store/${messageId}`
        let resp = await platform.get(endpoint);
        let jsonObj = await resp.json()
        console.log("Message status: ", jsonObj.messageStatus)
        if (jsonObj.messageStatus == "Queued"){
          await sleep (5000);
          check_message_status(jsonObj.id);
        }
    } catch (e) {
      console.log(e.message)
      process.exit(1)
    }
}

const sleep = async (ms) => {
  await new Promise(r => setTimeout(r, ms));
}

/**********************************************************
 Code snippet section for boostrap testing purpose
**********************************************************/
// For option 1
const RECIPIENT2    = process.env.SMS_RECIPIENT2
exports.platform = platform;
exports.RECIPIENT = RECIPIENT;
exports.RECIPIENT2 = RECIPIENT2;

//boostrap_test_function()

async function boostrap_test_function(){
/*
  await sleep(2000)
  console.log("Read SMS feature")
  require ('./code-snippets/number-features.js')

  await sleep(2000)
  console.log("Test sending MMS")
  require ('./code-snippets/send-mms.js')

  await sleep(2000)
  console.log("Test sending Fax")
  require ('./code-snippets/send-fax.js')

  await sleep(2000)
  console.log("Read message store")
  require ('./code-snippets/message-store.js')

  await sleep(2000)
  console.log("Export message store")
  require ('./code-snippets/message-store-export.js')

  await sleep(2000)
  console.log("Test sending HV SMS")
  require ('./code-snippets/send-a2p-sms.js')
*/
  await sleep(2000)
  console.log("Test access HV message store")
  require ('./code-snippets/a2p-message-store.js')
}
