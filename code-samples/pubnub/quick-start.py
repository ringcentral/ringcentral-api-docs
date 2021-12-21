#!/usr/bin/env python
from ringcentral import SDK
from multiprocessing import Process
from time import sleep
from ringcentral.subscription import Events
import os,sys

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
