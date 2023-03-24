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
    detect_high_volume_sms_feature()
});

async function detect_high_volume_sms_feature(){
    try{
	var resp = await platform.get("/restapi/v1.0/account/~/extension/~/phone-number")
	var jsonObj = await resp.json()
	for (var record of jsonObj.records){
	    for (var feature of record.features){
		if (feature == "A2PSmsSender"){
		    if (record.paymentType == "TollFree") {
			console.log(`${record.phoneNumber} is a toll-free number provisioned for high-volume SMS`)
		    } else { 
			console.log(`${record.phoneNumber} is a 10-DLC number provisioned for high-volume SMS`)
		    }
		}
	    }
	}
    }catch(e){
	console.log(e.message)
    }
}
