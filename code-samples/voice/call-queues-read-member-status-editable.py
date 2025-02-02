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

def get_account_call_queues():
    try:
        resp = platform.get('/restapi/v1.0/account/~/call-queues')
        for record in resp.json().records:
            if record.name == "Demo call queue":
                read_call_queue_info(record.id)
    except ApiException as e:
        print (e)

def read_call_queue_info(id):
    try:
        resp = platform.get('/restapi/v1.0/account/~/call-queues/' + id)
        print (resp.text())
    except ApiException as e:
            print (e)

get_account_call_queues()
