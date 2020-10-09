from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

params = {
    'view' : 'Simple'
}
resp = platform.get('/restapi/v1.0/account/~/extension/~/active-calls', params)
for record in resp.json().records:
    print "Call result: " + record.result
