#!/usr/bin/python

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

import os
import sys
 
from dotenv import load_dotenv
from ringcentral import SDK
load_dotenv()

DELIVERY_ADDRESS= '<https://XXXXXXXX.ngrok.io/webhookcallback>'

rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
try:
  platform.login( jwt=os.environ.get('RC_JWT') )
except Exception as e:
  sys.exit("Unable to authenticate to platform: " + str(e))

try:
    eventFilters = ['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS']
    params = {
        "eventFilters" : eventFilters,
        "deliveryMode": {
            "transportType": 'WebHook',
            "address": DELIVERY_ADDRESS
        }
    }
    res = platform.post("/subscription", params)
except Exception as e:
    print(f"An exception was thrown: {e}")
else:
    print(f'{res}')
