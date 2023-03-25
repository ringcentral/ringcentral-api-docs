from ringcentral import SDK

rcsdk = SDK( "client_id", "client_secret", "server_url")
platform = rcsdk.platform()
platform.login("username", "extension_number", "password")

resp = platform.get('/restapi/v1.0/account/~/presence',
	            {
		        'detailedTelephonyState' : True
	            })
for record in resp.json().records:
    print record.userStatus
