from ringcentral import SDK
import os,json
from dotenv import load_dotenv
load_dotenv()

#
#  Read user call log between a period of time
#
def read_user_calllog():
    try:
        queryParams = {
          'dateFrom': "2024-01-01T00:00:00.000Z",
          'dateTo': "2024-01-31T23:59:59.009Z",
          'view': "Detailed"
        }
        endpoint = "/restapi/v1.0/account/~/extension/~/call-log"
        resp = platform.get(endpoint, queryParams)
        jsonObj = resp.json_dict()
        for record in jsonObj['records']:
            print(json.dumps(record, indent=2, sort_keys=True))
    except Exception as e:
        print ("Unable to read user call log. " + str(e))

# Instantiate the SDK and get the platform instance
rcsdk = SDK( os.environ.get('RC_APP_CLIENT_ID'),
             os.environ.get('RC_APP_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt=os.environ.get('RC_USER_JWT') )
      read_user_calllog()
    except Exception as e:
      sys.exit("Unable to authenticate to platform. Check credentials." + str(e))

login()
##############################
# End of quick start section
##############################
