from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

resp = platform.get('/restapi/v1.0/account/~/call-queues')
for group in resp.json().records:
    if group.name == 'Support Department':
        resp = platform.post('/restapi/v1.0/account/~/call-queues/'+group.id+"/bulk-assign",{
            'addedExtensionIds': ['888888888', '999999999']
        })
        print (resp.response())
        break
