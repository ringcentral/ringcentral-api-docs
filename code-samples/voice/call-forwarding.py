from ringcentral import SDK

sdk = SDK( "client_id", "client_secret", "server_url" )
platform = sdk.platform()
platform.login( "username", "extension", "password" )

params = {
    'phoneNumber': '11235557890',
    'type': 'Other',
    'label': 'My ATT number'
  }
resp = platform.post('/restapi/v1.0/account/~/extension/~/forwarding-number', params)

print("Forwarding number created.")
print(resp.json().id)
