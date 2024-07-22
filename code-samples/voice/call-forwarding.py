#!/usr/bin/python

# You get the environment parameters from your
# application dashbord in your developer account
# https://developers.ringcentral.com

import os
import sys

from dotenv import load_dotenv
from ringcentral import SDK
load_dotenv()

FORWARDING   = os.environ.get('RC_FORWARDING_NUMBER')

rcsdk = SDK( os.environ.get('RC_APP_CLIENT_ID'),
             os.environ.get('RC_APP_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
try:
  platform.login( jwt=os.environ.get('RC_USER_JWT') )
except Exception as e:
  sys.exit("Unable to authenticate to platform: " + str(e))

params = {
    'phoneNumber': FORWARDING,
    'type': 'Other',
    'label': 'My ATT number'
}
try:
    resp = platform.post('/restapi/v1.0/account/~/extension/~/forwarding-number', params)
    print( f'Forwarding number created. ID: {resp.json().id}')
except Exception as e:
    sys.exit( f'Unknown exception: {e}' )
else:
    sys.exit( 0 )
