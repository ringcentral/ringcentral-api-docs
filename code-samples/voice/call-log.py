from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

params = {
    'view': 'Detailed'
}
resp = platform.get('/restapi/v1.0/account/~/extension/~/call-log', params)
for record in resp.json().records:
    print(f'Call type: {record.type}')
