from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

response = platform.get('/restapi/v1.0/account/~/extension/~/message-store',
	{
	    'messageType': ['SMS']
	})
print (response.text())
