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
    try:
        resp = platform.get('/restapi/v1.0/account/~/call-queues')
        for record in resp.json().records:
            get_call_queue_config(record.id)
    except ApiException as e:
        print (e)

def get_call_queue_config(id):
    try:
        resp = platform.get('/restapi/v1.0/account/~/call-queues/' + id)
        jsonObj = resp.json()
        if jsonObj.editableMemberStatus == False:
            enable_call_queue_editable(jsonObj.id)
    except ApiException as e:
            print (e)

def enable_call_queue_editable(id):
    try:
        resp = platform.put('/restapi/v1.0/account/~/call-queues/' + id,
        {
            "editableMemberStatus": True
        })
        print (resp.text())
    except ApiException as e:
        print (e)

get_account_call_queues()
