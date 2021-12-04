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
    resp = platform.put('/restapi/v1.0/account/~/extension/~/call-queue-presence',
    {
        "records": [
          {
            "callQueue": { "id" : "62376752000" },
            "acceptCalls": True
          },
          {
            "callQueue": { "id" : "62284876000" },
            "acceptCalls": False
          }
         ]
    })
    print (resp.text())
except ApiException as e:
    print (e)
