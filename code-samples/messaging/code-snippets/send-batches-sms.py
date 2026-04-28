import json
from ringcentral import SDK

# Read phone number(s) that belongs to the authenticated user and detect if a phone number
# has the SMS capability
def read_extension_phone_number_detect_sms_feature():
    try:
        endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
        resp = platform.get(endpoint)
        jsonObj = resp.json()
        for record in jsonObj.records:
            for feature in record.features:
                if feature == "SmsSender":
                    # If a user has multiple phone numbers, check and decide which number
                    # to be used for sending the message batch.
                    return send_batch_sms(record.phoneNumber)

        if jsonObj.records.count == 0:
            print ("This user does not own a phone number!")
        else:
            print ("None of this user's phone number(s) has the SMS capability!")
    except Exception as e:
        print (e)

#
# Broadcast a text message from a user own phone number to multiple recipients
#
def send_batch_sms(fromNumber):
    try:
        bodyParams = {
              "from": { "phoneNumber": fromNumber },
              "text": "Holiday Hours: Great news! Our shop will be open during the holiday from 10 AM–6 PM. Stop by and see us!",
              "messages": [
                { "to": [ { "phoneNumber": "Recipient-1-Phone-Number" } ] },
                { "to": [ { "phoneNumber": "Recipient-2-Phone-Number" } ] },
                { "to": [ { "phoneNumber": "Recipient-N-Phone-Number" } ] }
              ]
            }
        endpoint = "/restapi/v2/accounts/~/extensions/~/sms/batches"
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json_dict()
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
        print (e)

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt= "RC_USER_JWT" )
      read_extension_phone_number_detect_sms_feature()
    except Exception as e:
      print ("Unable to authenticate to platform. Check credentials." + str(e))
