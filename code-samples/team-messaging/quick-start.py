#!/usr/bin/env python
from ringcentral import SDK
import os,sys
from dotenv import load_dotenv
load_dotenv()

rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

try:
  platform.login(os.environ.get('RC_USERNAME'),
                 os.environ.get('RC_EXTENSION'),
                 os.environ.get('RC_PASSWORD') )
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
