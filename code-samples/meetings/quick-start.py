#!/usr/bin/env python
from ringcentral import SDK
import os,sys
from dotenv import load_dotenv
load_dotenv()

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

params = {
    'topic': 'Test Meeting 1',
    'meetingType': 'Instant',
    'allowJoinBeforeHost': True,
    'startHostVideo': True,
    'startParticipantsVideo' : False
}

try:
    resp = platform.post('/restapi/v1.0/account/~/extension/~/meeting', params)
    print(f'Start Your Meeting: {resp.json().links.startUri}')
    print(f'Join the Meeting: {resp.json().links.joinUri}')
except Exception as err:
    sys.exit( f'An error occurred trying to post: {err}')
else:
    # Successful exit
    sys.exit(0)
