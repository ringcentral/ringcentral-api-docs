#!/usr/bin/env python
# messaging/quick-start.py - This script helps developers send their first SMS message
#
# Variables:
# RC_CLIENT_ID, RC_CLIENT_SECRET, RC_SERVER_URL: Connection info
# RC_USERNAME, RC_PASSWORD, RC_EXTENSION: Auth credentials
# RECIPIENT_PHONE: The phone number to send the SMS to
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

sdk = SDK( CLIENTID, CLIENTSECRET, SERVER )
platform = sdk.platform()
platform.login( USERNAME, EXTENSION, PASSWORD )

response = platform.get('/restapi/v1.0/account/~/extension/~/message-store',
	{
	    'messageType': ['SMS']
	})
print( response.text() )
sys.exit(0)
