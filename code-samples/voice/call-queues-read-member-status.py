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

def get_account_call_queues():
    resp = platform.get('/restapi/v1.0/account/~/call-queues')
    jsonObj = resp.json()
    return jsonObj.records

def print_call_queue_member_status( id ):
    resp = platform.get('/restapi/v1.0/account/~/call-queues/' + id + "/presence")
    for r in resp.json().records:
        for m in r.members:
            print( f'- {m.name}: {m.acceptCurrentQueueCalls}' )

try:
    queues = get_account_call_queues()
    for q in queues:
        print( f'Found call queue: {q.name}' )
        print_call_queue_member_status( q.id )
except ApiException as e:
    sys.exit(e)
else:
    sys.exit(0)
