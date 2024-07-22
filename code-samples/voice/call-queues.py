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
    for group in resp.json().records:
        if group.name == 'Support Department':
            resp = platform.post('/restapi/v1.0/account/~/call-queues/'+group.id+"/bulk-assign",{
                'addedExtensionIds': ['888888888', '999999999']
            })
            print (resp.response())
            break
except Exception as e:
    sys.exit( f'Could not assign extensions to call queue: {e}' )
else:
    sys.exit( 0 )
