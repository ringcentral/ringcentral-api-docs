from ringcentral import SDK
import os,sys
from dotenv import load_dotenv
load_dotenv()

#
#  Create a new public team in Team Messaging with 3 internal members including the team owner
#
def create_team():
  try:
    bodyParams = {
        'public': True,
        'name': "Python Team",
        # Add internal members using their extension ids
        # Get your user extension id by calling the /restapi/v1.0/account/~/extension endpoint!
        'members': [{'id': "590490017"}, {'id': "595861017"}],
        # You can also add members using their email address, especially for guest members who are not under your account company.
        # members: [{'email': "member.1@gmail.com"}, { 'email': "member.2@gmail.com"}, {'id': "[extensionId]"}],
        'description': "Let's talk about Python"
    }
    endpoint = "/team-messaging/v1/teams"
    resp = platform.post(endpoint, bodyParams)
    print(resp.text())
  except Exception as err:
    print (err)


# Instantiate the SDK and get the platform instance
rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt=os.environ.get('RC_JWT') )
      create_team()
      #read_user_extensions()
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
    #read_analytics_timeline_data(1)
    time.sleep (2)
    import importlib
    # print ("Test reading timeline data grouped by queues")
    # ms = importlib.import_module("code-snippets.timeline-by-queues")
    # ms.platform = platform
    # ms.json = json
    # ms.read_analytics_timeline_grouped_by_queues()


# must be on the last line!
boostrap_test_function()
