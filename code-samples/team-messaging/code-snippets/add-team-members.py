from ringcentral import SDK
import time

#
# Find the team id of the team to be added new members
#
def find_team(pageToken, teamName):
    try:
        queryParams = {
          'recordCount': 10,
          'pageToken': pageToken
        }
        endpoint = "/team-messaging/v1/teams"
        resp = platform.get(endpoint, queryParams)
        jsonObj = resp.json()
        # Search through the team list to find the team
        print (f"Find the team id of the \"{teamName}\"")
        for record in jsonObj.records:
            if (record.name == teamName):
              print (f"Add new members to this team {teamName}")
              add_new_members(record.id)
              return

        # To read the next page, check and use the previous page token in the navigation object.
        if hasattr(jsonObj.navigation, 'prevPageToken'):
            pageToken = jsonObj.navigation.prevPageToken
            # Make sure not to exceed the API rate limit of 40 API calls per minute
            time.sleep(1.2)
            print ("Read newer teams ...")
            find_team(pageToken, teamName)
        else:
            print (f"Cannot find team {teamName}")
    except Exception as e:
        print ("Unable to read teams. ", str(e))

#
# Add new members to a team identified by the team id
#
def add_new_members(teamId):
  try:
    bodyParams = {
        'members': [
            # replace the email addresses below with valid internal or external new member email address
            { 'email': "member.name@abc.com" },
            { 'email': "guest.name@xyz.com" }
        ]
    }
    endpoint = f"/team-messaging/v1/teams/{teamId}/add"
    resp = platform.post(endpoint, bodyParams)
    print (f"New member(s) added. Response status {resp.response().status_code}")
  except Exception as e:
    print ("Unable to add new members. " + str(e))


# Authenticate a user using a personal JWT token
def login():
  try:
    platform.login( jwt= "RC_USER_JWT" )
    find_team("", "Python Team")
  except Exception as e:
    print ("Unable to authenticate to platform. Check credentials." + str(e))
