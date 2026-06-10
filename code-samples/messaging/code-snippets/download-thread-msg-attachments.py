import json
from ringcentral import SDK

#
# Read thread messages
#
def list_messages():
    try:
        query_params = {
            # "threadStatus": "Open",
            # "threadId": "...",
            # "ownerExtensionIds": ["..."],
            # "messageIds": ["..."],
            # "creationTimeFrom": "...",
            # "creationTimeTo": "...",
            "perPage": 10
        }

        endpoint = "/restapi/v1.0/account/~/message-threads/messages"

        resp = platform.get(endpoint, query_params)
        jsonObj = resp.json_dict()
        for msg in jsonObj['records']:
            # Parse and handle the message data

            # Check if this message has attachment(s)
            if msg.get("attachments"):
                get_message_attachments(msg["attachments"])
    except Exception as e:
        print(str(e))
#
# Download attachment(s) and save to a local file
#
def get_message_attachments(attachments):
    for attachment in attachments:
        fileName = str(attachment["filename"])
        try:
            res = platform.get(attachment["contentUri"])
            file = open(("%s" % (fileName)),'wb')
            file.write(res.body())
            file.close()
        except ApiException as e:
            print (e.getMessage())

# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt= "RC_USER_JWT" )
      list_messages()
    except Exception as e:
      print ("Unable to authenticate to platform. Check credentials." + str(e))
