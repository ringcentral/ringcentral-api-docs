//Import RC SDK
const RingCentral = require('@ringcentral/sdk').SDK
/*Provide the server_url, your client_id and client_secret.
  You get these parameters from your application dashbord in you developer account*/
var rcsdk = new RingCentral({server: "server_url", clientId: "client_id", clientSecret: "client_secret"})

//Create a platform instance to access the SMS APIs
var platform = rcsdk.platform();

/*Provide the username(phone number), account password and phone number extension.
  You get these parameters from your application dashbord in you developer account*/
platform.login({username: "username", password: "password", extension: "extension_number"})

platform.on(platform.events.loginSuccess, function(e){
  read_extension_phone_number()
});

/*On login success fetch the number that can send SMS
and its extention to send SMS from, once found, send the
actual SMS message*/
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

/*Send the actual SMS message. Provide the recipient_phone_number.
  You can provide any recipient you like*/
async function send_sms(fromNumber){
    try {
        
        var resp = await platform.post('/restapi/v1.0/account/~/extension/~/sms', {
            from: {'phoneNumber': fromNumber},
            to: [{'phoneNumber': "recipient_phone_number"}],
            text: 'Hello World from JavaScript'
        })
        var jsonObj = await resp.json()
        console.log("SMS sent. Message status: " + jsonObj.messageStatus)
    } catch(e) {
        console.log(e.message)
        process.exit(1)
    }
}
