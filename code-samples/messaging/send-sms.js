/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */

const SDK = require('@ringcentral/sdk').SDK
require('dotenv').config();

const RECIPIENT    = process.env.SMS_RECIPIENT

var rcsdk = new SDK({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});

var platform = rcsdk.platform();

  platform.login({
    'username':  process.env.RC_USERNAME,
    'password':  process.env.RC_PASSWORD,
    'extension': process.env.RC_EXTENSION
})

platform.on(platform.events.loginSuccess, function(e){
    read_extension_phone_number()
});

async function read_extension_phone_number(){
    try {

        var resp = await platform.get("/restapi/v1.0/account/~/extension/~/phone-number")
        var jsonObj = await resp.json()
        for (var record of jsonObj.records){
            for (feature of record.features){
                if (feature == "SmsSender"){
                    return send_sms(record.phoneNumber)
                }
            }
        }
    } catch(e) {
        console.log(e.message)
        process.exit(1)
    }
}

async function send_sms(fromNumber){
    try {
        
        var resp = await platform.post('/restapi/v1.0/account/~/extension/~/sms', {
            from: {'phoneNumber': fromNumber},
            to: [{'phoneNumber': RECIPIENT}],
            text: 'Hello World!'
        })
        var jsonObj = await resp.json()
        console.log("SMS sent. Message status: " + jsonObj.messageStatus)
    } catch(e) {
        console.log(e.message)
        process.exit(1)
    }
}
