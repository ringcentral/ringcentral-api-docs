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

endpoint = "/restapi/v1.0/glip/teams"
params = {
    "public": True,
    "name": "Fun team",
    "members": [{ "email": "member.1@gmail.com"}, {"email":"member.2@gmail.com"}],
    "description": "Let's chit chat here"
}
resp = platform.post(endpoint, params)
print(resp.text())
