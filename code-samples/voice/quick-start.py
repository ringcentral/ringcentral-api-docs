from ringcentral import SDK
import os,sys,urllib.parse,json
from pathlib import Path
from dotenv import load_dotenv
load_dotenv()

CALLER    = os.environ.get('RINGOUT_CALLER')
RECIPIENT = os.environ.get('RINGOUT_RECIPIENT')

#
#  Place a ring-out call
#
def call_ring_out():
    try:
        bodyParams = {
            'from' : { 'phoneNumber': CALLER },
            'to'   : { 'phoneNumber': RECIPIENT },
            'playPrompt' : False
        }
        endpoint = "/restapi/v1.0/account/~/extension/~/ring-out"
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json()
        print(f'Call placed. Call status: {jsonObj.status.callStatus}')
    except Exception as e:
        print ("Unable to place a ring-out call. " + str(e))

# Instantiate the SDK and get the platform instance
rcsdk = SDK( os.environ.get('RC_APP_CLIENT_ID'),
             os.environ.get('RC_APP_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt=os.environ.get('RC_USER_JWT') )
      call_ring_out()
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
    # print ("Test create call monitoring group")
    # ms = importlib.import_module("code-snippets.create-update-call-monitoring-group")
    # ms.platform = platform
    # ms.create_call_monitoring_group("Demo Group - Python")
    # #ms.delete_call_monitoring_group('8125017')
    #
    # time.sleep (2)
    # print ("Test list call monitoring groups and members")
    # ms = importlib.import_module("code-snippets.call-monitoring-group")
    # ms.platform = platform
    # ms.read_call_monitoring_groups()
    #
    # time.sleep (2)
    # print ("Test supervise call session")
    # ms = importlib.import_module("code-snippets.call-supervision")
    # ms.platform = platform
    # supervisorDeviceId = "802636634016"
    # agentExtensionId = "62295327016"
    #
    # ms.read_agent_active_calls(agentExtensionId, supervisorDeviceId)

    #print ("")
    # time.sleep (2)
    #ms = importlib.import_module("code-snippets.enrollment")
    #ms.platform = platform
    #contentFile = os.environ.get('ENROLLMENT_CONTENT_3')
    #ms.enrollment(contentFile)

    #print ("")
    # time.sleep (2)
    #ms = importlib.import_module("code-snippets.enrollment-extra")
    #ms.platform = platform
    #ms.read_enrollments()

    # ms = importlib.import_module("code-snippets.change-fac-state-call-terminating-rules")
    # ms.platform = platform
    # ms.read_user_fac_state_rules()

    # ms = importlib.import_module("code-snippets.set-fac-state-schedule")
    # ms.platform = platform
    # ms.set_user_fac_state_schedule()

    # ms = importlib.import_module("code-snippets.create-interaction-rule")
    # ms.platform = platform
    # ms.create_user_interaction_rule()

    ms = importlib.import_module("code-snippets.callqueue-answering-rule")
    ms.platform = platform
    ms.create_callqueue_custom_answering_rule("62498880016", "62576913016")
# must be on the last line!
boostrap_test_function()
