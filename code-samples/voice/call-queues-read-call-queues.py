#!/usr/bin/env python
# voice/call-queues-read-call-queues.py - 
#
# Variables:
# RC_CLIENT_ID, RC_CLIENT_SECRET, RC_SERVER_URL: Connection info
# RC_USERNAME, RC_PASSWORD, RC_EXTENSION: Auth credentials
# 
#
# License: MIT
# Copyright: 2021 RingCentral, Inc. 
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
