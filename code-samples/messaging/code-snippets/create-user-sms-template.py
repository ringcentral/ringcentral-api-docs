import json
from ringcentral import SDK

#
# Create a personal reusable SMS template
#
def create_user_sms_template():
    try:
        bodyParams = {
            'displayName': "Weekly meeting reminder",
            'body': { 'text': "Please update your slides before the meeting." }
        }
        endpoint = "/restapi/v1.0/account/~/extension/~/message-store-templates"
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json_dict()
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
        print ("Unable to create a user SMS template. " + str(e))


#
# List personal reusable SMS templates
#
def list_user_sms_template():
  try:
      endpoint =  "/restapi/v1.0/account/~/extension/~/message-store-templates"
      resp = platform.get(endpoint)
      jsonObj = resp.json_dict()
      print(json.dumps(jsonObj, indent=2, sort_keys=True))
  except Exception as e:
      print ("Unable to list user SMS templates. " + str(e))

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt= "PRODUCTION_JWT" )
      create_user_sms_template()
    except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
