from ringcentral import SDK
import json

#
# Create a company custom answering rule
#
def create_company_custom_answering_rule():
    try:
        bodyParams = {
            "enabled": True,
            "type": "Custom",
            "name": "New Year Holiday",
            "schedule": {
                "ranges": [
                    {
                        "from": "2025-12-31T17:00:00.00Z",
                        "to": "2026-01-02T08:00:00.00Z"
                    }
                ]
            },
            "callHandlingAction": "Bypass",
            "extension": {
                "id": "62952481016"  # ID of an announcement-only extension
            }
        }
        endpoint = '/restapi/v1.0/account/~/answering-rule'
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json_dict()
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
      print ("Unable to create a company custom answering rule. " + str(e))


# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "RC_USER_JWT" )
      create_company_custom_answering_rule()
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
