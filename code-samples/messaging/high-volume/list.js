const RingCentral = require('@ringcentral/sdk').SDK

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();

platform.login({
    'jwt':  process.env.RC_JWT
})

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
		    		if (record.paymentType == "TollFree")
						console.log(`This phone number ${record.phoneNumber} is a toll-free number and provisioned for using to send high volume SMS`)
		    		else
						console.log(`This phone number ${record.phoneNumber} is a local 10-DLC number and provisioned for using to send high volume SMS`)
				}
	    	}
		}
    }catch(e){
		console.log(e.message)
    }
}
