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

body = {
    "displayName": "HRCODE"
}

try:
  response =  platform.delete('/account/~/custom-fields/{}'.format(id))
  print("Custom Field Deleted")
except Exception as e:
  print("Error while creating custom fields" + e)
