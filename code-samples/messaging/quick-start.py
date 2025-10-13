import os, sys, time
from dotenv import load_dotenv
from ringcentral import SDK

load_dotenv()

# Read phone number(s) that belongs to the authenticated user and detect if a phone number
# has the SMS capability
def read_extension_phone_number_detect_sms_feature():
  try:
    resp = platform.get("/restapi/v1.0/account/~/extension/~/phone-number")
    jsonObj = resp.json()
    for record in jsonObj.records:
      for feature in record.features:
        if feature == "SmsSender":
          # If user has multiple phone numbers, check and decide which number
          # to be used for sending SMS message. For simplicity, we pick the first one we find.
          return send_sms(record.phoneNumber)
    if count(jsonObj.records) == 0:
      print("This user does not own a phone number!");
    else:
      print("None of this user's phone number(s) has the SMS capability!");
  except Exception as e:
    print (e.message)

# Send a text message from a user own phone number to a recipient number
def send_sms(fromNumber):
  try:
    bodyParams = {
         'from' : { 'phoneNumber': fromNumber },
         'to'   : [ {'phoneNumber': RECIPIENT} ],
         # To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
         #
         #'to': [
         #       { 'phoneNumber': "Recipient1-Phone-Number" },
         #       { 'phoneNumber': "Recipient2-Phone-Number" }
         #     ],
         'text' : "Hello World!"
    }
    endpoint = "/restapi/v1.0/account/~/extension/~/sms"
    resp = platform.post(endpoint, bodyParams)
    jsonObj = resp.json()
    print ("SMS sent. Message id: " + str(jsonObj.id))
    check_message_status(jsonObj.id)
  except Exception as e:
    print (e)

# Check the sending message status until it's out of the queued status
def check_message_status(messageId):
  try:
    endpoint = "/restapi/v1.0/account/~/extension/~/message-store/" + str(messageId)
    resp = platform.get(endpoint)
    jsonObj = resp.json()
    print ("Message status: " + jsonObj.messageStatus)
    if (jsonObj.messageStatus == "Queued"):
      time.sleep(2)
      check_message_status(jsonObj.id)
  except Exception as e:
    print (e)

# Instantiate the SDK and get the platform instance
rcsdk = SDK( os.environ.get('RC_APP_CLIENT_ID'),
             os.environ.get('RC_APP_CLIENT_SECRET'),
             "https://platform.ringcentral.com" )
platform = rcsdk.platform()

# For the purpose of testing the code, we put the SMS recipient number in the environment variable.
# Feel free to set the SMS recipient directly.
RECIPIENT    = os.environ.get('SMS_RECIPIENT')

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt=os.environ.get('RC_USER_JWT') )
      read_extension_phone_number_detect_sms_feature()
    except Exception as e:
      sys.exit("Unable to authenticate to platform. Check credentials." + str(e))

login()

##############################
# End of quick start section
##############################

########
# Code snippet section for boostrap testing purpose
########
RECIPIENT2    = os.environ.get('SMS_RECIPIENT2')

def boostrap_test_function():
  import importlib

  # time.sleep(2)
  # print ("Test reading number feature")
  # ms = importlib.import_module("code-snippets.number-features")
  # ms.platform = platform
  # ms.json = json
  # ms.detect_sms_feature()

  # print ("Test sending MMS")
  # time.sleep(2)
  # mms = importlib.import_module("code-snippets.send-mms")
  # mms.platform = platform
  # mms.rcsdk = rcsdk
  # mms.time = time
  # mms.RECIPIENT = RECIPIENT
  # mms.read_extension_phone_number_detect_mms_feature()
  #
  # time.sleep(2)
  # print ("Test sending Fax")
  # fax = importlib.import_module("code-snippets.send-fax")
  # fax.platform = platform
  # fax.rcsdk = rcsdk
  # fax.time = time
  # fax.RECIPIENT = RECIPIENT
  # fax.send_fax()
  #
  # time.sleep(2)
  # print ("Test reading message store")
  # ms = importlib.import_module("code-snippets.message-store")
  # ms.platform = platform
  # import json
  # ms.json = json
  # ms.read_extension_message_store()

  # time.sleep(2)
  # print ("Test export message store")
  # ms = importlib.import_module("code-snippets.message-store-export")
  # ms.platform = platform
  # ms.create_message_store_report()

  # time.sleep(2)
  # print ("Test sending a2p sms batch")
  # ms = importlib.import_module("code-snippets.send-a2p-sms")
  # ms.platform = platform
  # ms.RECIPIENT = RECIPIENT
  # ms.RECIPIENT2 = RECIPIENT2
  # ms.read_extension_phone_number_detect_a2psms_feature()


  time.sleep(2)
  print ("Test receive reply sms")
  ms = importlib.import_module("code-snippets.receive-reply-sms")
  ms.platform = platform
  ms.rcsdk = rcsdk
  ms.login()

########
# boostrap_test_function()
