#!/usr/bin/env python
from ringcentral import SDK
import os,sys
from dotenv import load_dotenv
load_dotenv()

rcsdk = SDK( os.environ.get('RC_APP_CLIENT_ID'),
             os.environ.get('RC_APP_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

try:
  platform.login( jwt=os.environ.get('RC_USER_JWT') )
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
