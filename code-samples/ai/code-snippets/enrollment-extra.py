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
