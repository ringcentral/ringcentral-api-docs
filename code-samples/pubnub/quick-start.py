from multiprocessing import Process
from time import sleep
from ringcentral.subscription import Events
from ringcentral import SDK

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

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
