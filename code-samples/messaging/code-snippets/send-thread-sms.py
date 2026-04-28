import json
from ringcentral import SDK

# Read the shared phone number that currently assigned to the authenticated user and detect if a phone number
# has the SMS capability
def read_shared_phone_number_detect_sms_feature():
    try:
        endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
        resp = platform.get(endpoint)
        jsonObj = resp.json_dict()
        for record in jsonObj['records']:
            # Find the "Financial Advising Queue" call queue's direct phone number
            if 'extension' in record and record['extension']['name'] == "Phong's Queue":
                for feature in record['features']:
                    if feature == "SmsSender":
                        send_thread_message(record.phoneNumber)
                        return

        if len(jsonObj['records']) == 0:
            print ("This user does not own a phone number!")
        else:
            print ("None of this user's phone number(s) has the SMS capability!")
    except Exception as e:
        print (e)

#
# Send a thread message to a recipient phone number
#
def send_thread_message(fromNumber):
    try:
        bodyParams = {
              "from": { "phoneNumber": fromNumber },
              "to": [ { "phoneNumber": "Recipient-1-Phone-Number" } ],
              "text": "Hi Tom ...",
            }
        endpoint = "/restapi/v1.0/account/~/message-threads/messages"
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json_dict()
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
        print (e)

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt= "RC_USER_JWT" )
      read_shared_phone_number_detect_sms_feature()
    except Exception as e:
      print ("Unable to authenticate to platform. Check credentials." + str(e))
