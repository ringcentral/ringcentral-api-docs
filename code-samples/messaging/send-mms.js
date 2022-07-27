/*You get the environment parameters from your 
application dashbord in your developer account 
https://developers.ringcentral.com/ */

const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();


const RECIPIENT    = process.env.SMS_RECIPIENT


  var rcsdk = new RC({
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