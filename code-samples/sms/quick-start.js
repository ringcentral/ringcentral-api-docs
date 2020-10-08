const RC = require('@ringcentral/sdk').SDK

RECIPIENT = '<ENTER PHONE NUMBER>'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new RC( {server: RINGCENTRAL_SERVER, clientId: RINGCENTRAL_CLIENTID, clientSecret: RINGCENTRAL_CLIENTSECRET} );
var platform = rcsdk.platform();
platform.login( {username: RINGCENTRAL_USERNAME, password: RINGCENTRAL_PASSWORD, extension: RINGCENTRAL_EXTENSION} )

platform.on(platform.events.loginSuccess, function(e){
  read_extension_phone_number()
});

async function read_extension_phone_number(){
  try{
    var resp = await platform.get("/restapi/v1.0/account/~/extension/~/phone-number")
    var jsonObj = await resp.json()
    for (var record of jsonObj.records){
      if (record.usageType == "DirectNumber"){
        for (feature of record.features){
          if (feature == "SmsSender"){
            return send_sms(record.phoneNumber)
          }
        }
      }
    }
  }catch(e){
    console.log(e.message)
  }
}

async function send_sms(fromNumber){
  try{
    var resp = await platform.post('/restapi/v1.0/account/~/extension/~/sms', {
       from: {'phoneNumber': fromNumber},
       to: [{'phoneNumber': RECIPIENT}],
       text: 'Hello World from JavaScript'
     })
    var jsonObj = resp.json()
    console.log("SMS sent. Message status: " + jsonObj.messageStatus)
  }catch(e){
    console.log(e.message)
  }
}
