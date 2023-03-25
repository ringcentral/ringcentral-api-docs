from ringcentral import SDK
import json
import envjwt

CLIENT_ID = envjwt.RC_APP_CLIENT_ID
CLIENT_SECRET = envjwt.RC_APP_CLIENT_SECRET
SERVER = envjwt.RC_SERVER
JWT_TOKEN = envjwt.RC_JWT_TOKEN

sdk = SDK(CLIENT_ID, CLIENT_SECRET, SERVER)

try:
    platform = sdk.platform()
    platform.login(jwt=JWT_TOKEN)

    res = platform.get('/account/~/extension/~')
except Exception as e:
    print (e)

try:
    endpoint = "/restapi/v1.0/account/~/audit-trail/search"
    data = {}
    data['eventTimeFrom'] = "2021-08-01T00:00:00.52Z"
    data['eventTimeTo'] = "2021-08-31T00:00:00.52Z"
    data['page'] = 2
    data['perPage'] = 10
    data['includeAdmins'] = True
    data['includeHidden'] = True
    data['searchParameters'] = []

    res = platform.post(endpoint, data)
    print( json.dumps(res.json_dict(), indent=2, sort_keys=True) )
    print('search results')
except Exception as e:
    print (e)
