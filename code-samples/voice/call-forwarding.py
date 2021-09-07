#!/usr/bin/env python
# meetings/quick-start.py - This script helps developers create a meeting
#
# Variables:
# RC_CLIENT_ID, RC_CLIENT_SECRET, RC_SERVER_URL: Connection info
# RC_USERNAME, RC_PASSWORD, RC_EXTENSION: Auth credentials
# RC_PHONENUMBER - the phone number to forward calls to
#
# License: MIT
# Copyright: 2021 RingCentral, Inc. 
from ringcentral import SDK
import os,sys

CLIENTID     = os.environ.get('RC_CLIENT_ID')
CLIENTSECRET = os.environ.get('RC_CLIENT_SECRET')
SERVER       = os.environ.get('RC_SERVER_URL')
USERNAME     = os.environ.get('RC_USERNAME')
PASSWORD     = os.environ.get('RC_PASSWORD')
EXTENSION    = os.environ.get('RC_EXTENSION')
FORWARDING   = os.environ.get('RC_FORWARDING_NUMBER')

rcsdk = SDK( CLIENTID, CLIENTSECRET, SERVER )
platform = rcsdk.platform()
try:
  platform.login(USERNAME, EXTENSION, PASSWORD)
except:
  sys.exit("Unable to authenticate to platform. Check credentials.")

params = {
    'phoneNumber': FORWARDING,
    'type': 'Other',
    'label': 'My ATT number'
}
try:
    resp = platform.post('/restapi/v1.0/account/~/extension/~/forwarding-number', params)
    print( f'Forwarding number created. ID: {resp.json().id}')
except Exception as e:
    sys.exit( f'Unknown exception: {e}' )
else:
    sys.exit( 0 )
    
