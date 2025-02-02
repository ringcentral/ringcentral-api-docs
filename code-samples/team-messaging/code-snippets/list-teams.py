from ringcentral import SDK
import time

#
# List teams under an account. Read 10 teams at a time.
#
def list_teams(pageToken):
    try:
        queryParams = {
          'recordCount': 10,
          'pageToken': pageToken
        }
        endpoint = "/team-messaging/v1/teams"
        resp = platform.get(endpoint, queryParams)
        jsonObj = resp.json()

        # List teams API returns a list of teams in the ascending order based on team creation date and time.
        # I.e. from older team to newer team
        for record in jsonObj.records:
            print (f'The team "{record.name}" was created on {record.creationTime}')

        # To read the next page, check and use the previous page token in the navigation object.
        if hasattr(jsonObj.navigation, 'prevPageToken'):
            pageToken = jsonObj.navigation.prevPageToken
            # Make sure not to exceed the API rate limit of 40 API calls per minute
            time.sleep(1.2)
            print ("Read newer teams ...")
            list_teams(pageToken)
    except Exception as e:
        print ("Unable to read teams. ", str(e))


# Authenticate a user using a personal JWT token
def login():
  try:
    platform.login( jwt= "RC_USER_JWT" )
    read_teams("")
  except Exception as e:
    print ("Unable to authenticate to platform. Check credentials." + str(e))
