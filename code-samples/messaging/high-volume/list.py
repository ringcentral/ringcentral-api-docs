from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

response = platform.get('/restapi/v1.0/account/~/extension/~/phone-number')
for record in response.json().records:
    print "This phone number " + record.phoneNumber + " has the following features: "
    for feature in record.features:
		if feature == "A2PSmsSender":
	    	if record.paymentType == "TollFree":
				print (" This phone number " + record['phoneNumber'] + " is a toll-free number and provisioned for using to send high volume SMS")
	    	else:
				print (" This phone number " + record['phoneNumber'] + " is a 10-DCL local number and provisioned for using to send high volume SMS")
