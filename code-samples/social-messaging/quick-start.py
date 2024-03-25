from ringcentral import SDK
import os,sys,json,time
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()

#
#  List contents from all connected channels
#
def list_contents(pageToken):
    try:
        queryParams = {
          'perPage': 50
        }
        if pageToken != "":
            queryParams['pageToken'] = pageToken

        endpoint = "/cx/social-messaging/v1/contents"
        resp = platform.get(endpoint, queryParams)
        jsonObj = resp.json_dict()
        for record in jsonObj['records']:
            print(json.dumps(record, indent=2, sort_keys=True))

        # To read the next page, check and use the nextPageToken in the paging object.
        if jsonObj['paging'].get('nextPageToken'):
            pageToken = jsonObj['paging']['nextPageToken']
            # Make sure not to exceed the API rate limit of 40 API calls per minute
            time.sleep(1.2)
            print ("Read contents from the next page ...")
            list_contents(pageToken)
        else:
            print ("Done! No more next page.")
    except Exception as e:
        print ("Unable to call list contents API. " + str(e))

# Instantiate the SDK and get the platform instance
rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             "https://platform.ringcentral.com" )
platform = rcsdk.platform()

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt=os.environ.get('RC_JWT') )
      list_contents("")
    except Exception as e:
      sys.exit("Unable to authenticate to platform. Check credentials." + str(e))

login()
##############################
# End of quick start section
##############################


########
# Code snippet section for boostrap testing purpose
########
import time
def boostrap_test_function():

    time.sleep (2)
    import importlib

    # time.sleep (2)
    # print ("Test reply message")
    # ms = importlib.import_module("code-snippets.reply-message")
    # ms.platform = platform
    # ms.reply_message("65ef2ffea757720007399854")

    time.sleep (2)
    print ("Test list identities")
    ms = importlib.import_module("code-snippets.list-identities")
    ms.platform = platform
    ms.list_identities("")

# must be on the last line!
boostrap_test_function()
