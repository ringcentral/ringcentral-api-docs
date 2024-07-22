import os, sys
from dotenv import load_dotenv
from ringcentral import SDK

load_dotenv()

# Create an instant RCV meeting
def create_meeting():
  try:
    bodyParams = {
         'name' : "Test meeting",
         'type' : "Instant"
    }
    endpoint = "/rcvideo/v2/account/~/extension/~/bridges"
    resp = platform.post(endpoint, bodyParams)
    jsonObj = resp.json()
    print ("Start Your Meeting: " + jsonObj.discovery.web)
  except Exception as e:
    print (e)

# Instantiate the SDK and get the platform instance
rcsdk = SDK( os.environ.get('RC_APP_CLIENT_ID'),
             os.environ.get('RC_APP_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()


# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt=os.environ.get('RC_USER_JWT') )
      create_meeting()
    except Exception as e:
      sys.exit("Unable to authenticate this user. Check credentials." + str(e))

login()
