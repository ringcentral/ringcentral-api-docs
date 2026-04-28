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
                    return send_batch_with_group_messaging(record.phoneNumber)

        if jsonObj.records.count == 0:
            print ("This user does not own a phone number!")
        else:
            print ("None of this user's phone number(s) has the SMS capability!")
    except Exception as e:
        print (e)

#
# Send a batch with multiple group messaging. Recipients in the same group will see each other's phone numbers.
#
def send_batch_with_group_messaging(fromNumber):
    try:
        bodyParams = {
          "from": {"phoneNumber": fromNumber},
          "text": "",
          "messages": [
              {
                  "to": [
                      {"phoneNumber": "Recipient-1"},
                      {"phoneNumber": "Recipient-2"},
                      {"phoneNumber": "Recipient-3"}
                  ],
                  "text": "Work with your group to discuss and complete the assignment A by 1:00 PM."
              },
              {
                  "to": [
                      {"phoneNumber": "Recipient-A"},
                      {"phoneNumber": "Recipient-B"},
                      {"phoneNumber": "Recipient-C"}
                  ],
                  "text": "Work with your group to discuss and complete assignment B by 3:00 PM."
              },
              {
                  "to": [
                      {"phoneNumber": "Recipient-X"},
                      {"phoneNumber": "Recipient-Y"},
                      {"phoneNumber": "Recipient-Z"}
                  ],
                  "text": "Work with your group to discuss and complete the assignment C by 6:00 PM."
              }
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
