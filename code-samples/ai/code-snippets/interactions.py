from ringcentral import SDK
import os,sys,urllib.parse,json

NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS"
WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
CONTENT_URI = 'PUBLICLY-ACCESSIBLE-CONTENT-URI'

#
# Transcribe a call recording and analyze interaction
#
def analyze_interaction():
    try:
        bodyParams = {
          'contentUri': CONTENT_URI,
          'encoding': "Mpeg",
          'languageCode': "en-US",
          'source': "RingCentral",
          'audioType': "CallCenter",
          'insights': [ "All" ],
          'enableVoiceActivityDetection': True,
          'separateSpeakerPerChannel': True
        }
        endpoint = f'/ai/insights/v1/async/analyze-interaction?webhook={urllib.parse.quote(WEBHOOK_URL)}'
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json()
        if resp.response().status_code == 202:
            print(f'Job ID: {resp.json().jobId}');
            print(f'Ready to receive response at: {WEBHOOK_URL}');
    except Exception as e:
      print ("Unable to analyze interaction. " + str(e))



# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "PRODUCTION-JWT" )
      analyze_interaction()
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
