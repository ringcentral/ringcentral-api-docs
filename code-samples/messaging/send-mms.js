//Import RC SDK
const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

//Make sure you provide RECIPIENT in the .env file.
const RECIPIENT    = process.env.SMS_RECIPIENT

/*Make sure you provide the RC_SERVER_URL, your RC_CLIENT_ID and RC_CLIENT_SECRET in the .env file.
  You get these parameters from your application dashbord in your developer account https://developers.ringcentral.com/ */
  var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});

//Create a platform instance to access the SMS APIs
var platform = rcsdk.platform();

/*Make sure you provide the RC_USERNAME(phone number/email id), RC_PASSWORD and RC_EXTENSION in the .env file.
  You get these parameters from your sandbox account on the developer portal https://developers.ringcentral.com/ */
  platform.login({
    'username':  process.env.RC_USERNAME,
    'password':  process.env.RC_PASSWORD,
    'extension': process.env.RC_EXTENSION
})

platform.on(platform.events.loginSuccess, function(e){
    read_extension_phone_number()
});

/*On login success fetch the 'from_number' that the logged in user is allowed to send SMS from by looking for 
"MmsSender" feature*/
async function read_extension_phone_number(){
  try {
      var resp = await platform.get("/restapi/v1.0/account/~/extension/~/phone-number")
      var jsonObj = await resp.json()
      for (var record of jsonObj.records){
          for (feature of record.features){
              if (feature == "MmsSender"){
                  return send_mms(record.phoneNumber)
              }
          }
      }
  } catch(e) {
      console.log(e.message)
      process.exit(1)
  }
}

/*Send the actual MMS message by providing the RECIPIENT. This RECIPIENT can be 
any working phone number*/
async function send_mms(fromNumber){
    var FormData = require('form-data');
    fd = new FormData();
    var body = {
    from: {'phoneNumber': fromNumber},
    to: [{'phoneNumber': RECIPIENT}]
    }

    fd.append('json', new Buffer.from(JSON.stringify(body)), {

        contentType: 'application/json'
        });

    //Choose an image to send within the message
    fd.append('attachment', require('fs').createReadStream('TestImage.jpg'));
    try {
    var resp = await platform.post('/restapi/v1.0/account/~/extension/~/mms', fd)
    var jsonObj = await resp.json()
    console.log("MMS sent. Message status: " + jsonObj.messageStatus)
    console.log('Message Id: ' + jsonObj.id)
    }catch (e){
    console.log(e.message)
    }
}