const RingCentral = require('@ringcentral/sdk').SDK

var rcsdk = new RingCentral( {server: "server_url", clientId: "client_id", clientSecret: "client_secret"} )
var platform = rcsdk.platform()

platform.login( {username: "username", password: "password", extension: "extension_number"} )

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
