#!/usr/bin/env python
# pubnub/quick-start.py - This script helps developers subscribe to events via pubnub
#
# Variables:
# RC_CLIENT_ID, RC_CLIENT_SECRET, RC_SERVER_URL: Connection info
# RC_USERNAME, RC_PASSWORD, RC_EXTENSION: Auth credentials
# 
#
# License: MIT
# Copyright: 2021 RingCentral, Inc. 
from ringcentral import SDK
from multiprocessing import Process
from time import sleep
from ringcentral.subscription import Events
import os,sys

CLIENTID     = os.environ.get('RC_CLIENT_ID')
CLIENTSECRET = os.environ.get('RC_CLIENT_SECRET')
SERVER       = os.environ.get('RC_SERVER_URL')
USERNAME     = os.environ.get('RC_USERNAME')
PASSWORD     = os.environ.get('RC_PASSWORD')
EXTENSION    = os.environ.get('RC_EXTENSION')

rcsdk = SDK( CLIENTID, CLIENTSECRET, SERVER)
platform = rcsdk.platform()
platform.login(USERNAME, EXTENSION, PASSWORD)

def on_message(msg):
    print (msg)

def pubnub():
    try:
        s = rcsdk.create_subscription()
        s.add_events(['/account/~/extension/~/message-store/instant?type=SMS'])
        s.on(Events.notification, on_message)
        res = s.register()
        try:
            print("Wait for notification...")
        except Exception as e:
            print (e)
            sys.exit(1)
        while True:
            sleep(0.1)

    except KeyboardInterrupt:
        print("Pubnub listener stopped...")

p = Process(target=pubnub)
try:
    p.start()
except KeyboardInterrupt:
    p.terminate()
    print("Stopped by User")
    sys.exit(1)
