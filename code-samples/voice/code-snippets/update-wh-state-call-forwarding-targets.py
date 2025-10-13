from ringcentral import SDK
import json

#
# Read existing rules
#
def read_user_workhours_state_rules():
    try:
        endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours'
        resp = platform.get(endpoint)
        jsonObj = resp.json_dict()
        update_user_workhours_state_rules(jsonObj['dispatching'])
    except Exception as e:
        print ("Unable to read user Work-Hours state rules. " + str(e))

#
# Update the Work-Hours state rules with new values
#
def update_user_workhours_state_rules(dispatching):
    try:
        # new phone number forwarding target
        newTarget = {
            "type": "RingGroupAction",
            "enabled": True,
            "targets": [
              {
                "type": "PhoneNumberRingTarget",
                "destination": {
                    "phoneNumber": "+13121234567"
                },
                "name": "Temporary number"
              }
            ],
            "duration": 25 # 5 rings
        }
        dispatching['actions'].insert(0, newTarget)
        bodyParams = {
            'dispatching': dispatching
          }
        endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours'
        resp = platform.patch(endpoint, bodyParams)
        jsonObj = resp.json_dict()
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
      print ("Unable to update user Work-Hours state rules. " + str(e))


# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "RC_USER_JWT" )
      read_user_workhours_state_rules()
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
