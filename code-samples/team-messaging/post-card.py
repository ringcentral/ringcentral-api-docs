#!/usr/bin/python

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

import os
import sys
 
from dotenv import load_dotenv
from ringcentral import SDK
load_dotenv()

CHAT_ID = '<GROUP ID>'

rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
try:
  platform.login( jwt=os.environ.get('RC_JWT') )
except Exception as e:
  sys.exit("Unable to authenticate to platform: " + str(e))

endpoint = "/restapi/v1.0/glip/chats/" + CHAT_ID + '/adaptive-cards'
card = {
    "type": "AdaptiveCard",
    "body": [
	{
	    "type": "TextBlock",
	    "size": "Medium",
	    "weight": "Bolder",
	    "text": "Adaptive Card example"
	},
	{
	    "type": "Image",
	    "url": "https://bit.ly/3nwZbRM"
	}
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.3"
}

resp = platform.post(endpoint, card)
print(resp.text())
