from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

try:
    resp = platform.put('/restapi/v1.0/account/~/extension/~/call-queue-presence',
    {
        "records": [
          {
            "callQueue": { "id" : "62376752000" },
            "acceptCalls": True
          },
          {
            "callQueue": { "id" : "62284876000" },
            "acceptCalls": False
          }
         ]
    })
    print (resp.text())
except ApiException as e:
    print (e)
