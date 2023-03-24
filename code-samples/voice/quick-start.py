#!/usr/bin/python

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

import os
import sys
 
from dotenv import load_dotenv
from ringcentral import SDK
load_dotenv()

CALLER    = os.environ.get('RINGOUT_CALLER')
RECIPIENT = os.environ.get('RINGOUT_RECIPIENT')

rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
try:
  platform.login( jwt=os.environ.get('RC_JWT') )
except Exception as e:
  sys.exit("Unable to authenticate to platform: " + str(e))

resp = platform.post('/restapi/v1.0/account/~/extension/~/ring-out',
              {
                  'from' : { 'phoneNumber': CALLER },
                  'to'   : { 'phoneNumber': RECIPIENT },
                  'playPrompt' : False
              })
print(f'Call placed. Call status: {resp.json().status.callStatus}')
