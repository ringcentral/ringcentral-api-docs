#!/usr/bin/env python
from ringcentral import SDK
import os,sys

CLIENTID     = 'RC_CLIENT_ID'
CLIENTSECRET = 'RC_CLIENT_SECRET'
SERVER       = 'RC_SERVER_URL'
USERNAME     = 'RC_USERNAME'
PASSWORD     = 'RC_PASSWORD'
EXTENSION    = 'RC_EXTENSION'

rcsdk = SDK( CLIENTID, CLIENTSECRET, SERVER )
platform = rcsdk.platform()
try:
  platform.login(USERNAME, EXTENSION, PASSWORD)
except:
  sys.exit("Unable to authenticate to platform. Check credentials.")

params = {
    'name': 'Test Meeting'
}
try:
    resp = platform.post('/rcvideo/v2/account/~/extension/~/bridges', params)
    print("Start your meeting: " + resp.web.discovery)
except Exception as err:
    print("Exception: " + err.message)
