from ringcentral import SDK
import json

#
# Check speech to text job status
#
def check_task_status(jobId):
    try:
        endpoint = f'/ai/status/v1/jobs/{jobId}'
        resp = platform.get(endpoint)
        jsonObj = resp.json_dict()
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
      print ("Unable to get speech to text job status. " + str(e))



# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "PRODUCTION-JWT" )
      check_task_status("jobId")
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
