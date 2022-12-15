#!/usr/bin/env python
from ringcentral import SDK
import os,sys,urllib.parse
from dotenv import load_dotenv
load_dotenv()

# Read instructions on running code samples to include all required variables
# https://developers.ringcentral.com/guide/basics/code-samples
NGROK       = "<INSERT NGROK URL>"
WEBHOOK_URL = NGROK + "/webhook"
CONTENT_URI = os.environ.get('RC_MEDIA_URL')

rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
try:
  platform.login( jwt=os.environ.get('RC_JWT') )
except Exception as e:
  sys.exit("Unable to authenticate to platform: " + str(e))

resp = platform.post("/ai/audio/v1/async/speech-to-text?webhook=" + urllib.parse.quote(WEBHOOK_URL), {
  "contentUri":               CONTENT_URI,
  "encoding":                 "Wav",
  "languageCode":             "en-US",
  "source":                   "RingCentral",
  "audioType":                "Meeting",
  "enablePunctuation":        True,
  "enableSpeakerDiarization": False
})

print(f'Speech To Text job {resp.response().reason} with HTTP status code {resp.response().status_code}');

if resp.response().status_code == 202:
  print(f'Ready to receive response at: {WEBHOOK_URL}');
else:
  print(f'An error occurred posting the request.');

