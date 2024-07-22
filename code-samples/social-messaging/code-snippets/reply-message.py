import json
from ringcentral import SDK

# Read the current authenticated user's message store.
def reply_message(messageId):
    try:
        bodyParams = {
            'inReplyToContentId': messageId,
            'body': "Thank you for your message! Python",
            'autoSubmitted': True,
            'public': False
          }
        endpoint = "/cx/social-messaging/v1/contents"
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json_dict()
        print(json.dumps(jsonObj, indent=2, sort_keys=True))
    except Exception as e:
        print ("Unable to reply to this message. Error message: " + str(e))


# Authenticate a user using a personal JWT token
def login():
    try:
      platform.login( jwt= "RC_USER_JWT" )
      reply_message("A-Valid-Message-Id")
    except Exception as e:
      print ("Unable to authenticate to platform. Check credentials." + str(e))
