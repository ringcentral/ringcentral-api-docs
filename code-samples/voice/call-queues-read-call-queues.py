from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

try:
    resp = platform.get('/restapi/v1.0/account/~/call-queues')
    print (resp.text())
except ApiException as e:
    print (e)
