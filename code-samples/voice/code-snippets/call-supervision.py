from ringcentral import SDK
import json

#
# Read agent active calls
#
def read_agent_active_calls(agentExtensionId, supervisorDeviceId):
    try:
        endpoint = f'/restapi/v1.0/account/~/extension/{agentExtensionId}/active-calls'
        resp = platform.get(endpoint)
        jsonObj = resp.json()
        for record in jsonObj.records:
            if record.result == "In Progress":
                submit_call_supervise_request(record.telephonySessionId, agentExtensionId, supervisorDeviceId)
                break
    except Exception as e:
        print ("Unable to read agent's active calls. " + str(e))


#
# Supervise an active call session
#
def submit_call_supervise_request(telephonySessionId, agentExtensionId, supervisorDeviceId):
    try:
        endpoint = f'/restapi/v1.0/account/~/telephony/sessions/{telephonySessionId}/supervise'
        bodyParams = {
            'mode': 'Listen',
            'supervisorDeviceId': supervisorDeviceId,
            'agentExtensionId': agentExtensionId
          }
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json_dict()
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
      print ("Unable to supervise this call. " + str(e))


# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "RC_USER_JWT" )

      supervisorDeviceId = "TEST-SUPERVISOR-DEVICEID"
      agentExtensionId = "TEST-AGENT-EXTENSIONID"
      read_agent_active_calls(agentExtensionId, supervisorDeviceId)
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
