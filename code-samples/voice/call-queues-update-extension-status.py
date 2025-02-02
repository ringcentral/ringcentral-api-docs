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

try:
    resp = platform.put('/restapi/v1.0/account/~/extension/~/call-queue-presence',
    {
        "records": [
          {
            "callQueue": { "id" : "62376752000" },
            "acceptCalls": True
          },
          {
            "callQueue": { "id" : "62284876000" },
            "acceptCalls": False
          }
         ]
    })
    print (resp.text())
except ApiException as e:
    print (e)
