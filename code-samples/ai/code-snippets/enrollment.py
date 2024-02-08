from ringcentral import SDK
import json
import base64

#
# Read a speaker id
#
def read_enrollment(enrollmentId):
    try:
        endpoint = f"/ai/audio/v1/enrollments/{enrollmentId}"
        resp = platform.get(endpoint)
        jsonObj = resp.json_dict()
        return jsonObj
    except Exception as e:
        print ("Unable to find this speaker identification. " + str(e))
        return None


#
# Enroll speaker identification
#
def create_speaker_enrollment(contentFile):
    try:
        # use own extension id as a unique enrollment id
        tokens = platform.auth().data()
        enrollmentId = str(tokens['owner_id'])

        with open(contentFile, "rb") as f:
            base64_bytes = base64.b64encode(f.read())
        base64_string = base64_bytes.decode('utf-8')

        endpoint = '/ai/audio/v1/enrollments'

        # check if this speaker id exists
        enrollmentObj = read_enrollment(enrollmentId)
        if enrollmentObj != None:
            # speaker id exists => update it
            print ("Existing enrollment")
            print(json.dumps(enrollmentObj, indent=2, sort_keys=True))
            bodyParams = {
                'encoding': "Mpeg",
                'languageCode': "en-US",
                'content': base64_string
            }
            resp = platform.patch(f"{endpoint}/{enrollmentId}", bodyParams)
        else:
            # speaker id does not exist => enroll a new one
            bodyParams = {
                'encoding': "Mpeg",
                'languageCode': "en-US",
                'content': base64_string,
                'enrollmentId': enrollmentId
            }
            resp = platform.post(endpoint, bodyParams)

        jsonObj = resp.json_dict()
        print ("New enrollment")
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
      print ("Unable to enroll speaker identification. " + str(e))


# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "PRODUCTION-JWT" )
      # et your valid audio content file name and path
      contentFile = "VALID_AUDIO_CONTENT_FILE"
      create_speaker_enrollment(contentFile)
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
