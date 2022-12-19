#!/usr/bin/python

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

import os
import sys
 
from dotenv import load_dotenv
from ringcentral import SDK
 
load_dotenv()
 
rcsdk = SDK(os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
 
try:
  platform.login(os.environ.get('RC_USERNAME'),
                 os.environ.get('RC_EXTENSION'),
                 os.environ.get('RC_PASSWORD') )
except Exception as e:
  sys.exit("Unable to authenticate to platform. Check credentials." + str(e))

try:
    resp = platform.get('/rcvideo/v2/account/~/extension/~/bridges/default')
    print("Your personal meeting URL is: " + resp.web.discovery)
except Exception as err:
    print("Exception: " + err.message)
