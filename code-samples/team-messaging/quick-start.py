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

endpoint = "/team-messaging/v1/teams"
params = {
    "public": True,
    "name": "Fun team",
    "members": [{ "email": "member.1@gmail.com"}, {"email":"member.2@gmail.com"}],
    "description": "Let's chit chat here"
}
resp = platform.post(endpoint, params)
print(resp.text())
