import os,sys
import logging
import requests
from ringcentral import SDK
from dotenv import load_dotenv

WEBHOOK_URL = "<INSERT WEBHOOK URL>"

# Load Enviroment variables
load_dotenv()

# Invoke Smart Punctuate API 
def smartPunctuate():
    # Endpoint to invoke Smart Punctuate API 
    endpoint = os.getenv('RC_SERVER_URL')+"/ai/text/v1/async/punctuate"
    # Webhook as Query string
    querystring = { "webhook": WEBHOOK_URL }
    # Payload
    payload = {
        "texts": [
            "so its more fluid than it is and you know its not the best kind of feedback right"
        ]
    }

    try:
        # Instantiate Ringcentral SDK 
        rcsdk = SDK( os.getenv('RC_CLIENT_ID'),os.getenv('RC_CLIENT_SECRET'),os.getenv('RC_SERVER_URL'))
        platform = rcsdk.platform()
        # Login Using JWT
        platform.login( jwt=os.getenv('RC_JWT') );
        # Make HTTP POST call to the smart punctuate endpoint with the query string and payload
        response = platform.post(endpoint, payload, querystring);
        print(response.json());
    except Exception as e:
        print(e)

try:
    smartPunctuate()
except Exception as e:
    print(e)
