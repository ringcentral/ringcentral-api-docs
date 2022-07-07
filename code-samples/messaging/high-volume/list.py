from ringcentral import SDK

rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

try:
  platform.login( jwt=os.environ.get('RC_JWT') )
except:
  sys.exit("Unable to authenticate to platform. Check credentials.")

response = platform.get('/restapi/v1.0/account/~/extension/~/phone-number')
for record in response.json().records:
    print "This phone number " + record.phoneNumber + " has the following features: "
    for feature in record.features:
		if feature == "A2PSmsSender":
	    	if record.paymentType == "TollFree":
				print (" This phone number " + record['phoneNumber'] + " is a toll-free number and provisioned for using to send high volume SMS")
	    	else:
				print (" This phone number " + record['phoneNumber'] + " is a 10-DCL local number and provisioned for using to send high volume SMS")
