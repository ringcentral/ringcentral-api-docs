from ringcentral import SDK

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

DELIVERY_ADDRESS= '<https://XXXXXXXX.ngrok.io/webhookcallback>'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

try:
    eventFilters = ['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS']
    params = {
        "eventFilters" : eventFilters,
        "deliveryMode": {
            "transportType": 'WebHook',
            "address": DELIVERY_ADDRESS
        }
    }
    res = platform.post("/subscription", params)
except Exception as e:
    print(f"An exception was thrown: {e}")
else:
    print(f'{res}')
