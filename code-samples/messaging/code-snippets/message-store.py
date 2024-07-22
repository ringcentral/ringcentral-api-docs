import json
from ringcentral import SDK

# Read the current authenticated user's message store.
def read_extension_message_store():
    try:
        queryParams = {
            'dateFrom': "2023-01-01T00:00:00.000Z",
            'dateTo': "2023-01-31T23:59:59.999Z",
            'messageType': ["SMS", "Fax"],
            'perPage': 1000
          }
        endpoint = "/restapi/v1.0/account/~/extension/~/message-store"
        resp = platform.get(endpoint, queryParams)
        jsonObj = resp.json_dict()
        for record in jsonObj['records']:
            print(json.dumps(record, indent=2, sort_keys=True))
    except Exception as e:
        print (str(e))


# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt= "RC_USER_JWT" )
      read_extension_message_store()
    except Exception as e:
      print ("Unable to authenticate to platform. Check credentials." + str(e))
