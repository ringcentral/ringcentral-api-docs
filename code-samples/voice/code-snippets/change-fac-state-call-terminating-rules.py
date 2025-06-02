from ringcentral import SDK
import json

#
# Read existing rules
#
def read_user_fac_state_rules():
    try:
        endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls'
        resp = platform.get(endpoint)
        jsonObj = resp.json_dict()
        update_user_fac_state_rules(jsonObj['dispatching'])
    except Exception as e:
        print ("Unable to read user FAC state rules. " + str(e))

#
# Update rules with new values
#
def update_user_fac_state_rules(dispatching):
    try:
        actions = dispatching['actions']
        # Find the "TerminatingAction" object from the dispatching actions list
        action = next((a for a in actions if a.get("type") == "TerminatingAction"), None)
        if action != None:
            # Change the terminating target type
            action['terminatingTargetType'] = "PlayAnnouncementTerminatingTarget"
            bodyParams = {
                'dispatching': dispatching
              }
            endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls'
            resp = platform.patch(endpoint, bodyParams)
            jsonObj = resp.json_dict()
            print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
      print ("Unable to update user FAC state rules. " + str(e))


# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "RC_USER_JWT" )
      read_user_fac_state_rules()
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
