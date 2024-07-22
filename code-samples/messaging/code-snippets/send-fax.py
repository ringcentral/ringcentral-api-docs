import time
from ringcentral import SDK

# Send a high resolution fax message to a recipient number
def send_fax():
    try:
        builder = rcsdk.create_multipart_builder()
        builder.set_body({
            'to': [{ 'phoneNumber': RECIPIENT }],
            # To send fax to multiple recipients, add more 'phoneNumber' object. E.g.
            #
            # to: [
            #       { 'phoneNumber': "Recipient1-Phone-Number" },
            #       { 'phoneNumber': "Recipient2-Phone-Number" }
            # ],
            'faxResolution': "High",
            'coverPageText': "This is a demo Fax page from Python"
        })

        with open('test.jpg', "rb") as f:
            content = f.read()
            attachment = ('test.jpg', content)
            builder.add(attachment)
            request = builder.request('/restapi/v1.0/account/~/extension/~/fax')
        resp = platform.send_request(request)
        jsonObj = resp.json()
        print ("Fax sent. Message id: " + str(jsonObj.id))
        check_fax_message_status(jsonObj.id)
    except Exception as e:
        print (e)


# Check the sending message status until it's no longer in the queued status
def check_fax_message_status(messageId):
    try:
        endpoint = "/restapi/v1.0/account/~/extension/~/message-store/" + str(messageId)
        resp = platform.get(endpoint)
        jsonObj = resp.json()
        print ("Message status: " + jsonObj.messageStatus)
        if jsonObj.messageStatus == "Queued":
            time.sleep(10)
            check_fax_message_status(jsonObj.id)
    except Exception as e:
        print (e)


# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt=os.environ.get('RC_USER_JWT') )
      send_fax()
    except Exception as e:
      print ("Unable to authenticate to platform. Check credentials." + str(e))
