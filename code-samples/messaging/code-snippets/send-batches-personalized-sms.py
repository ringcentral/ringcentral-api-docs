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
                    return send_personalized_sms(record.phoneNumber)

        if jsonObj.records.count == 0:
            print ("This user does not own a phone number!")
        else:
            print ("None of this user's phone number(s) has the SMS capability!")
    except Exception as e:
        print (e)

#
# Send a batch from a user own phone number to multiple recipient with personalized message
#
def send_personalized_sms(fromNumber):
    try:
        bodyParams = {
          "from": { phoneNumber: fromNumber},
          "text": "",
          "messages": [
            {
              "to": [ {"phoneNumber": "Recipient-1-Phone-Number"}],
              "text": "Hi Tom, your appointment with Dr. Lee is scheduled for tomorrow at 10AM."
            },
            {
              "to": [ {"phoneNumber": "Recipient-2-Phone-Number"} ],
              "text": "Hi Jenn, your appointment with Dr. Derick is scheduled for tomorrow at 9AM."

            },
            {
              "to": [ {"phoneNumber": "Recipient-n-Phone-Number"} ],
              "text": "Hi Laurence, your appointment with Dr. Derick is scheduled for tomorrow at 1PM."
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
