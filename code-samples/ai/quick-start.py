from ringcentral import SDK
import os,sys,urllib.parse,json
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()

#
#  Convert speech to text
#
def speech_to_text():
    try:
        bodyParams = {
          'contentUri':               os.environ.get('CONTENT_URI'),
          'encoding':                 "Mpeg",
          'languageCode':             "en-US",
          'source':                   "RingCentral",
          'audioType':                "CallCenter",
          'enablePunctuation':        True,
          'enableSpeakerDiarization': True
        }
        callbackAddress = os.environ.get('NGROK_URL') + "/webhook"
        endpoint = "/ai/audio/v1/async/speech-to-text?webhook=" + urllib.parse.quote(callbackAddress)
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json()
        if resp.response().status_code == 202:
            print(f'Job ID: {resp.json().jobId}');
            print(f'Ready to receive response at: {callbackAddress}');
        else:
            print(f'An error occurred posting the request.');
    except Exception as e:
        print ("Unable to call speech to text API. " + str(e))

# Instantiate the SDK and get the platform instance
rcsdk = SDK( os.environ.get('RC_APP_CLIENT_ID'),
             os.environ.get('RC_APP_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt=os.environ.get('RC_USER_JWT') )
      speech_to_text()
    except Exception as e:
      sys.exit("Unable to authenticate to platform. Check credentials." + str(e))

login()
##############################
# End of quick start section
##############################


########
# Code snippet section for boostrap testing purpose
########
import time
def boostrap_test_function():
    #read_analytics_timeline_data(1)
    time.sleep (2)
    import importlib

    #time.sleep (2)
    # print ("Test analyze interaction API")
    # ms = importlib.import_module("code-snippets.interactions")
    # ms.platform = platform
    # ms.analyze_interaction()

    # time.sleep (2)
    # print ("Test checking stt task status")
    # ms = importlib.import_module("code-snippets.check-task")
    # ms.platform = platform
    # ms.check_task_status("cc131168-03a9-11ee-8c7a-0050568c5fe3")

    #print ("Test enrollment")
    # time.sleep (2)
    #ms = importlib.import_module("code-snippets.enrollment")
    #ms.platform = platform
    #contentFile = os.environ.get('ENROLLMENT_CONTENT_3')
    #ms.enrollment(contentFile)

    # print ("Test extra enrollment")
    # time.sleep (2)
    #ms = importlib.import_module("code-snippets.enrollment-extra")
    #ms.platform = platform
    #ms.read_enrollments()

    # print ("Test speaker identification")
    # time.sleep (2)
    # ms = importlib.import_module("code-snippets.speaker-identification")
    # ms.platform = platform
    # ms.speakers_identification()

    # print ("Test punctuation")
    # time.sleep (2)
    # ms = importlib.import_module("code-snippets.punctuation")
    # ms.platform = platform
    # ms.punctuation()

    # print ("Test summarize")
    # time.sleep (2)
    # ms = importlib.import_module("code-snippets.summarize")
    # ms.platform = platform
    # ms.conversation_summary()

    print ("Test speaker diarization")
    time.sleep (2)
    ms = importlib.import_module("code-snippets.speaker-diarization")
    ms.platform = platform
    ms.speakers_recognition()

# must be on the last line!
boostrap_test_function()
