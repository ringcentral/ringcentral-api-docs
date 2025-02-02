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
    resp = platform.get('/restapi/v1.0/account/~/call-queues')
    records = resp.json().records
    if len(records) == 0:
        print( f'No call queues were found for the current account' )
    else:
        for r in records:
            print( f'Call queue: name = {r["name"]}, extension = {r["extension"]}' )

except ApiException as e:
    sys.exit( e )
else:
    sys.exit( 0 )
