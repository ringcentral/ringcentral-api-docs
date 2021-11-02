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
