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
