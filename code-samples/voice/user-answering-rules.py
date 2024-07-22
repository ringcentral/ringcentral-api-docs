#!/usr/bin/python

# You get the environment parameters from your
# application dashbord in your developer account
# https://developers.ringcentral.com

import os
import sys

from dotenv import load_dotenv
from ringcentral import SDK
load_dotenv()

rcsdk = SDK( os.environ.get('RC_APP_CLIENT_ID'),
             os.environ.get('RC_APP_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
try:
  platform.login( jwt=os.environ.get('RC_USER_JWT') )

except Exception as e:
  sys.exit("Unable to authenticate to platform: " + str(e))

params = {
    'enabled': True,
    'type': 'Custom',
    'name': "My weekly meetings",
    'schedule' : {
      'weeklyRanges': {
    	'monday': [{ 'from': "09:00",'to': "10:00" }],
    	'friday': [{ 'from': "10:00", 'to': "15:00" }]
      }
    },
    'callHandlingAction': "TakeMessagesOnly"
  }
resp = platform.post('/restapi/v1.0/account/~/extension/~/answering-rule', params)

print(resp.text())
