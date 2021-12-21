#!/usr/bin/env python
from ringcentral import SDK
import os,sys

CLIENTID     = os.environ.get('RC_CLIENT_ID')
CLIENTSECRET = os.environ.get('RC_CLIENT_SECRET')
SERVER       = os.environ.get('RC_SERVER_URL')
USERNAME     = os.environ.get('RC_USERNAME')
PASSWORD     = os.environ.get('RC_PASSWORD')
EXTENSION    = os.environ.get('RC_EXTENSION')

rcsdk = SDK( CLIENTID, CLIENTSECRET, SERVER )
platform = rcsdk.platform()
try:
  platform.login(USERNAME, EXTENSION, PASSWORD)
except:
  sys.exit("Unable to authenticate to platform. Check credentials.")

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
