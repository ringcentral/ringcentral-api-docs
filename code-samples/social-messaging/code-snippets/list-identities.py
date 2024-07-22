import json,time
from ringcentral import SDK

# Read the current authenticated user's message store.
def list_identities(pageToken):
    try:
        queryParams = {
          'perPage': 10
        }
        if pageToken != "":
            queryParams['pageToken'] = pageToken

        endpoint = "/cx/social-messaging/v1/identities"
        resp = platform.get(endpoint, queryParams)
        jsonObj = resp.json_dict()
        for record in jsonObj['records']:
            print(json.dumps(record, indent=2, sort_keys=True))

        # To read the next page, check and use the nextPageToken in the paging object.
        if jsonObj['paging'].get('nextPageToken'):
            pageToken = jsonObj['paging']['nextPageToken']
            # Make sure not to exceed the API rate limit of 40 API calls per minute
            time.sleep(1.2)
            print ("Read identities from the next page ...")
            list_identities(pageToken)
        else:
            print ("Done! No more next page.")
    except Exception as e:
        print ("Unable to list identities. Error message: " + str(e))


# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt= "RC_USER_JWT" )
      list_identities("")
    except Exception as e:
      print ("Unable to authenticate to platform. Check credentials." + str(e))
