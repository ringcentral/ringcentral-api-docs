from ringcentral import SDK
import json

#
# Read speakers identification
#
def read_enrollments():
    try:
        queryParams = {
            'partial': True,
            'perPage': 100,
            'page': 1
        }
        endpoint = '/ai/audio/v1/enrollments'
        resp = platform.get(endpoint, queryParams)
        jsonObj = resp.json_dict()
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
        jsonObj1 = resp.json()
        for record in jsonObj1.records:
            if record.enrollmentId == '123456789':
                delete_enrollment(record.enrollmentId)
                break
    except Exception as e:
      print ("Unable to enroll speaker identification. " + str(e))


#
# Delete a speaker identification
#
def delete_enrollment(speakerId):
    try:
        endpoint = '/ai/audio/v1/enrollments/' + speakerId
        resp = platform.delete(endpoint)
        print("Deleted")
    except Exception as e:
      print ("Unable to enroll speaker identification. " + str(e))


# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "PRODUCTION-JWT" )
      read_enrollments()
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
