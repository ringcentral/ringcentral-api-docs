import time
from ringcentral import SDK

# Read phone number(s) that belongs to the authenticated user and detect if a phone number
# has the MMS capability
def read_extension_phone_number_detect_mms_feature():
    try:
        endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
        resp = platform.get(endpoint)
        jsonObj = resp.json()
        for record in jsonObj.records:
            for feature in record.features:
                if feature == "MmsSender":
                    # If a user has multiple phone numbers, check and decide which number
                    # to be used for sending MMS message.
                    return send_mms(record.phoneNumber)

        if jsonObj.records.count == 0:
            print ("This user does not own a phone number!")
        else:
            print ("None of this user's phone number(s) has the MMS capability!")
    except Exception as e:
        print (e)


# Send a multi-media message from a user own phone number to a recipient number
def send_mms(fromNumber):
    try:
        builder = rcsdk.create_multipart_builder()
        builder.set_body({
            'from' : { 'phoneNumber': fromNumber },
            'to'   : [ {'phoneNumber': RECIPIENT} ],
            # To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
            #
            # 'to': [
            #       { 'phoneNumber': "Recipient1-Phone-Number" },
            #       { 'phoneNumber': "Recipient2-Phone-Number" }
            #     ],
            'text' : 'Hello world'
        })

        with open('test.jpg', "rb") as f:
            content = f.read()
            attachment = ('test.jpg', content)
            builder.add(attachment)
            request = builder.request('/restapi/v1.0/account/~/extension/~/sms')
        resp = platform.send_request(request)
        jsonObj = resp.json()
        print ("MMS sent. Message id: " + str(jsonObj.id))
        check_mms_message_status(jsonObj.id)
    except Exception as e:
        print (e)


# Check the sending message status until it's no longer in the queued status
def check_mms_message_status(messageId):
    try:
        endpoint = "/restapi/v1.0/account/~/extension/~/message-store/" + str(messageId)
        resp = platform.get(endpoint)
        jsonObj = resp.json()
        print ("Message status: " + jsonObj.messageStatus)
        if jsonObj.messageStatus == "Queued":
            time.sleep(5)
            check_mms_message_status(jsonObj.id)
    except Exception as e:
        print (e.message)

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt= "SANDBOX_JWT" )
      read_extension_phone_number_detect_mms_feature()
    except Exception as e:
      print ("Unable to authenticate to platform. Check credentials." + str(e))
