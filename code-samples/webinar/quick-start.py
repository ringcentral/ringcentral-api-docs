#!/usr/bin/python

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

import os
import sys
 
from dotenv import load_dotenv
from ringcentral import SDK
load_dotenv()
 
rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
try:
  platform.login( jwt=os.environ.get('RC_JWT') )

except Exception as e:
  sys.exit("Unable to authenticate to platform: " + str(e))

def create_webinar(fromNumber):
  try:
    resp = platform.post('/webinar/configuration/v1/webinars',
    {
	'title': "My first webinar",
	'description': "This webinar was created via the Webinar Quick Start guide for developers"
    })
    jsonObj = resp.json()
  except:
    sys.exit("Unable to create a webinar")
    print (jsonObj.messageStatus)

create_webinar()
