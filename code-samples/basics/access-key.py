#!/usr/bin/env python
from ringcentral import SDK
import os,sys
from dotenv import load_dotenv
load_dotenv()

RECIPIENT = os.environ.get('RINGOUT_RECIPIENT')

rcsdk = SDK( os.environ.get('RC_APP_CLIENT_ID'),
             os.environ.get('RC_APP_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
try:
  platform.login( jwt=os.environ.get('RC_USER_JWT') )
except Exception as e:
  sys.exit("Unable to authenticate to platform: " + str(e))

auth = platform.auth()
print('Access key: {auth.access_token()}')
