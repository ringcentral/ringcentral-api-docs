from ringcentral import SDK
import os,sys,urllib.parse,json

NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS"
WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
CONTENT_URI = 'PUBLICLY-ACCESSIBLE-CONTENT-URI'

#
# Identify speakers from a conversation
#
def speakers_identification():
    enrolledSpeakerIds = read_enrolled_speakers()
    if len(enrolledSpeakerIds) > 0:
        try:
            bodyParams = {
              'contentUri': CONTENT_URI,
              'encoding': "Mpeg",
              'languageCode': "en-US",
              'source': "RingCentral",
              'audioType': "CallCenter",
              'speakerIds': enrolledSpeakerIds
            }
            endpoint = f'/ai/audio/v1/async/speaker-identify?webhook={urllib.parse.quote(WEBHOOK_URL)}'
            resp = platform.post(endpoint, bodyParams)
            jsonObj = resp.json()
            if resp.response().status_code == 202:
                print(f'Job ID: {resp.json().jobId}')
                print(f'Ready to receive response at: {WEBHOOK_URL}')
        except Exception as e:
          print ("Unable to call speaker identify API. " + str(e))
    else:
        print("No enrolled speakers. Please enroll a few speaker ids and try again.")

#
# Read the account enrolled speakers
#
def read_enrolled_speakers():
    enrolledSpeakerIds = []
    try:
        queryParams = {
            'partial': False,
            'perPage': 100,
            'page': 1
        }
        endpoint = "/ai/audio/v1/enrollments"
        resp = platform.get(endpoint, queryParams)
        jsonObj = resp.json_dict()
        for enrollment in jsonObj['records']:
            enrolledSpeakerIds.append(enrollment['speakerId'])
    except Exception as e:
        print ("Unable to find enrolled speakers. " + str(e))

    return enrolledSpeakerIds


# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "PRODUCTION-JWT" )
      speakers_identification()
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
