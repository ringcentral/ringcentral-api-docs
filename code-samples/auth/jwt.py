#!/usr/bin/env python
from ringcentral import SDK
import os,sys

rcsdk = SDK( os.environ.get('RC_APP_CLIENT_ID'),
             os.environ.get('RC_APP_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

try:
  platform.login( jwt=os.environ.get('RC_USER_JWT') )
except Exception as e:
  sys.exit("Unable to authenticate to platform. Check credentials." + str(e))

print(f'Login with JWT successful.')
