#!/usr/bin/env python
# meetings/quick-start.py - This script helps developers create a meeting
#
# Variables:
# RC_CLIENT_ID, RC_CLIENT_SECRET, RC_SERVER_URL: Connection info
# RC_USERNAME, RC_PASSWORD, RC_EXTENSION: Auth credentials
# 
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

rcsdk = SDK( CLIENTID, CLIENTSECRET, SERVER )
platform = rcsdk.platform()
try:
  platform.login(USERNAME, EXTENSION, PASSWORD)
except:
  sys.exit("Unable to authenticate to platform. Check credentials.")

params = {
    'view': "Detailed",
    'enabledOnly': False
}
try:
    resp = platform.get('/account/~/extension/~/answering-rule', params)
    for record in resp.json().records:
        rule = platform.get('/account/~/extension/~/answering-rule/' + record.id)
        print( f'Answering rule: {rule.name} is of type {rule.type}' )
except Exception as e:
    sys.exit( e )
else:
    sys.exit( 0 )
