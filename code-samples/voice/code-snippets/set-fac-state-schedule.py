from ringcentral import SDK
import json

#
# Set user forward-all-calls state schedule
#
def set_user_fac_state_schedule():
    try:
        bodyParams = {
        'enabled': True,
        'conditions': [ {
            'type': "Schedule",
            'schedule' : {
              'triggers': [ {
                'triggerType': "Range",
                'ranges': [ {
                    'startDateTime': "2025-07-04T00:00:00",
                    'endDateTime': "2025-07-05T08:00:00"
                  } ]
              } ]
            }
          } ]
        }
        endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/states/forward-all-calls'
        resp = platform.patch(endpoint, bodyParams)
        jsonObj = resp.json_dict()
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
        print ("Unable to set user FAC state schedule. " + str(e))

# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "RC_USER_JWT" )
      set_user_fac_state_schedule()
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
