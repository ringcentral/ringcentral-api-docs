import os, sys, json

from dotenv import load_dotenv
from ringcentral import SDK
load_dotenv()

# For the purpose of testing the code, we put the deliver address in the environment variable.
# Feel free to set the delivery address directly.
DELIVERY_ADDRESS= os.environ.get('WEBHOOK_DELIVERY_ADDRESS') + "/webhook"

#
# Create a Webhok notification and subscribe for instant SMS message notification
#
def subscribe_for_notification():
    try:
        eventFilters = ['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS']
        bodyParams = {
            'eventFilters' : eventFilters,
            'deliveryMode': {
                'transportType': 'WebHook',
                'address': DELIVERY_ADDRESS
            },
            'expiresIn': 3600
        }
        endpoint = "/restapi/v1.0/subscription"
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json()
        print (f"Subscription id: {jsonObj.id}")
        print ("Ready to receive incoming SMS via WebHook.")
    except Exception as e:
        print ("Webhook creation failed.")
        print(f"An exception was thrown: {e}")


#
# Read all created subscriptions
#
def read_subscriptions():
    try:
        endpoint = "/restapi/v1.0/subscription"
        resp = platform.get(endpoint)
        jsonObj = resp.json_dict()
        if jsonObj['records'].count == 0:
            print ("No subscription.")
        else:
            for record in jsonObj['records']:
                print(json.dumps(record, indent=2, sort_keys=True))
                delete_subscription(record['id'])
    except Exception as e:
        print(f"An exception was thrown: {e}")

#
# Delete a subscription identified by the subscription id
#
def delete_subscription(subscriptionId):
    try:
        endpoint = f"/restapi/v1.0/subscription/{subscriptionId}"
        resp = platform.delete(endpoint)
        print (f"Subscription {subscriptionId} deleted.")
    except Exception as e:
        print(f"An exception was thrown: {e}")

# Instantiate the SDK and get the platform instance
rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt=os.environ.get('RC_JWT') )
      subscribe_for_notification()
      #read_subscriptions()
    except Exception as e:
      sys.exit("Unable to authenticate to platform. Check credentials." + str(e))

login()
