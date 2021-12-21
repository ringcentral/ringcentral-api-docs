from ringcentral import SDK

DELIVERY_ADDRESS= '<https://XXXXXXXX.ngrok.io/webhookcallback>'

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
