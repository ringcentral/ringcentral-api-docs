//Import RC SDK
const RingCentral = require('@ringcentral/sdk').SDK
/*Provide the server_url, your client_id and client_secret.
  You get these parameters from your application dashbord in your developer account, for example
  server_url for production: https://platform.ringcentral.com
  server_url for sandbox: https://platform.devtest.ringcentral.com
  */
var rcsdk = new RingCentral({server: "server_url", clientId: "client_id", clientSecret: "client_secret"})

//Create a platform instance to access the SMS APIs
var platform = rcsdk.platform();

/*Provide the RingCentral username(phone number/email id), account password and phone number extension.
  You get these parameters from your sandbox account on the developer portal https://developers.ringcentral.com/ */
platform.login({username: "username", password: "password", extension: "extension_number"})

platform.on(platform.events.loginSuccess, function(e){
  read_extension_phone_number()
});

/*On login success fetch the 'from_number' that the logged in user is allowed to send SMS from by looking for 
"SmsmSender"feature*/
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

/*Send the actual MMS message by providing the 'recipient_phone_number'. This 'recipient_phone_number' can be 
any working phone number*/
async function send_mms(){
var FormData = require('form-data');
fd = new FormData();
var body = {
  from: {'phoneNumber': fromNumber},
  to: [{'phoneNumber': "recipient_phone_number"}],
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
