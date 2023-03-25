/* You get the environment parameters from your 
   application dashbord in your developer account 
   https://developers.ringcentral.com */

const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});

var platform = rcsdk.platform();

platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, function(e){
    console.log("Login success")
    send_high_volume_sms()
});

async function send_high_volume_sms() {
    try{
        var requestBody = {
            from: "+16505550100",
            text: "Hello Team",
            messages: [
		{ to: ["+14155550100"] },
		{ to: ["+12125550100"] }
            ]
        }
        var resp = await platform.post('/restapi/v1.0/account/~/a2p-sms/batches', requestBody)
        var jsonObj = await resp.json()
        console.log(jsonObj)
    }catch(e){
        console.log(e.message)
    }
}
