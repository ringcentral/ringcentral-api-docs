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

try:
    status = "DoNotAcceptDepartmentCalls"
    resp = platform.put('/restapi/v1.0/account/~/extension/~/presence',
                        { "dndStatus": status })
    print( f'Do not disturb status set to {status}' )
except ApiException as e:
    sys.exit(e)
else:
    sys.exit(0)
