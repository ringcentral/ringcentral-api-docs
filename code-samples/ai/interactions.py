import os,sys
import logging
import requests
from ringcentral import SDK
from dotenv import load_dotenv

# Load Enviroment variables
load_dotenv()

# Invoke Interaction Analysis API 
def analyzeInteractions():
    # Endpoint to invoke Interaction analysis API 
    endpoint = os.getenv('RC_SERVER_URL')+"/ai/insights/v1/async/analyze-interaction"

    # Webhook as Query string
    querystring = {"webhook":os.getenv('WEBHOOK_ADDRESS')}

    # Payload
    payload = {
        "contentUri": "https://github.com/suyashjoshi/ringcentral-ai-demo/blob/master/public/audio/sample1.wav?raw=true",
        "encoding": "Wav",
        "languageCode": "en-US",
        "source": "RingCentral",
        "audioType": "Meeting",
        "insights": ["All"],
        "enableVoiceActivityDetection": True,
        "enablePunctuation": True,
        "enableSpeakerDiarization": False
    }

    try:
        # Instantiate Ringcentral SDK 
        rcsdk = SDK( os.getenv('RC_CLIENT_ID'),os.getenv('RC_CLIENT_SECRET'),os.getenv('RC_SERVER_URL'))
        platform = rcsdk.platform()

        # Login Using JWT
        platform.login( jwt=os.getenv('RC_JWT') );

        # Make HTTP POST call to the Interaction analysis endpoint with the query string and payload
        response = platform.post(endpoint, payload, querystring);
        print(response.json());

    except Exception as e:  
        print(e)

try:
    analyzeInteractions()
except Exception as e:
    print(e)
