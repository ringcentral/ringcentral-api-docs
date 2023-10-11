from ringcentral import SDK
import os,sys,urllib.parse,json

NGROK = "http://4bb8-69-181-201-33.ngrok-free.app"
WEBHOOK_URL = NGROK + "/webhook";
CONTENT_URI = 'https://rclabs-addin-resources.s3.us-east-1.amazonaws.com/media/Sample%20Call%20Tech%20Support.mp3'

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
          'separateSpeakerPerChannel': False
        }
        endpoint = f'/ai/insights/v1/async/analyze-interaction?webhook={urllib.parse.quote(WEBHOOK_URL)}'
        print (bodyParams)
        print (endpoint)
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json()
        print(f'Request:     {resp.response().reason}');
        print(f'Status code: {resp.response().status_code}');
        if resp.response().status_code == 202:
            print(f'Job ID: {resp.json().jobId}');
            print(f'Ready to receive response at: {WEBHOOK_URL}');
            fileName = "transcript-db.json"
            transcriptionObj = []
            try:
                if os.path.exists(fileName) == True:
                    transcriptDB = open(fileName,'r')
                    transcriptionObj = json.loads(transcriptDB.read())
                else:
                    transcriptDB = open(fileName,'x')
                newTranscription = {
                  'jobId': jsonObj.jobId,
                  'response': {}
                }
                transcriptionObj.append(newTranscription)
                transcriptDB = open(fileName,'w')
                transcriptDB.write(json.dumps(transcriptionObj))
            except Exception as e:
                print (e)
        else:
            print(f'An error occurred posting the request.');
    except Exception as e:
      print ("Unable to analyze interaction. " + str(e))



# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "PRODUCTION-JWT" )
      analyze_interaction()
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
