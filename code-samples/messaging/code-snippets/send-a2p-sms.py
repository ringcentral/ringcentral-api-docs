import time, json
from ringcentral import SDK

# Read phone number(s) that belongs to the authenticated user and detect if a phone number
# has the A2P SMS capability
def read_extension_phone_number_detect_a2psms_feature():
    try:
        endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
        resp = platform.get(endpoint)
        jsonObj = resp.json()
        for record in jsonObj.records:
            for feature in record.features:
                if feature == "A2PSmsSender":
                    # If a user has multiple phone numbers, check and decide which number
                    # to be used for sending A2P SMS message.
                    return send_batch_sms(record.phoneNumber)

        if jsonObj.records.count == 0:
            print ("This user does not own a phone number!")
        else:
            print ("None of this user's phone number(s) has the A2P SMS capability!")
    except Exception as e:
        print (e)

#
# Broadcast a text message from a user own phone number to multiple recipients
#
def send_batch_sms(fromNumber):
    try:
        bodyParams = {
            'from': fromNumber,
            'text': "Hello Team",
            'messages': [
          		{ 'to': [RECIPIENT] }
            # Adding more recipients
          	#	{ 'to': [ "Recipient-2-Phone-Number"] },
            #	{ 'to': [ "Recipient-N-Phone-Number"] }
            #
            ]
        }
        endpoint = "/restapi/v1.0/account/~/a2p-sms/batches"
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json()
        print ("Batch sent. Batch id: " + jsonObj.id)
        check_batch_status(jsonObj.id)
    except Exception as e:
        print (e)

#
# Send a batch from a user own phone number to multiple recipient with personalized message
#
def send_personalized_sms(fromNumber):
    try:
        bodyParams = {
            'from': fromNumber,
            # This text becomes the default text and can be obmitted, if the text in a recipient object is not specified, this text will be used
            'text': "Hello Team",
            'messages': [
          		{ 'to': [RECIPIENT], 'text': "Hello Alice" }
            # Adding more recipients
          	#	{ 'to': [ "Recipient-2-Phone-Number"], 'text': "Hello Bob" },
            #	{ 'to': [ "Recipient-N-Phone-Number"], 'text': "Hola Maria" }
            #
            ]
        }
        endpoint = "/restapi/v1.0/account/~/a2p-sms/batches"
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json()
        print ("Batch sent. Batch id: " + jsonObj.id)
        check_batch_status(jsonObj.id)
    except Exception as e:
        print (e)


#
# Check the batch status until it's completed.
# Sending a large batch will take some time for the server to complete. You can read a batch status using the batch id returned in the response after sending a batch.
#
def check_batch_status(batchId):
  try:
      endpoint =  "/restapi/v1.0/account/~/a2p-sms/batches/" + batchId
      resp = platform.get(endpoint)
      jsonObj = resp.json_dict()
      print ("Batch status: ", jsonObj['status'])
      if jsonObj['status'] != "Completed":
          time.sleep (5)
          check_batch_status(jsonObj['id'])
      else:
          print(json.dumps(jsonObj, indent=2, sort_keys=True))
  except Exception as e:
      print (e)

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt= "RC_USER_JWT" )
      read_extension_phone_number_detect_a2psms_feature()
    except Exception as e:
      print ("Unable to authenticate to platform. Check credentials." + str(e))
