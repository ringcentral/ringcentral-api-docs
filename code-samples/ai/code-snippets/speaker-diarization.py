from ringcentral import SDK
import os,sys,urllib.parse,json

NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS"
WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI"

#
# Detect speakers from a conversation
#
def speakers_detection():
    try:
        bodyParams = {
        'contentUri': CONTENT_URI,
        'encoding': "Mpeg",
        'languageCode': "en-US",
        'source': "RingCentral",
        'audioType': "CallCenter"
        }
        endpoint = f'/ai/audio/v1/async/speaker-diarize?webhook={urllib.parse.quote(WEBHOOK_URL)}'
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json()
        if resp.response().status_code == 202:
            print(f'Job ID: {resp.json().jobId}')
            print(f'Ready to receive response at: {WEBHOOK_URL}')
    except Exception as e:
        print ("Unable to call speaker diarization API. " + str(e))


# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "PRODUCTION-JWT" )
      speakers_detection()
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
