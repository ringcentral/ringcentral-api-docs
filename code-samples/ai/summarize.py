import os,sys
import logging
import requests
from ringcentral import SDK
from dotenv import load_dotenv

# Load Enviroment variables
load_dotenv()
    
def conversationalSummary():
    # Endpoint to invoke Conversational Summary
    endpoint = "https://platform.devtest.ringcentral.com/ai/text/v1/async/summarize"
    # Webhook as Query Param
    querystring = {"webhook":os.getenv('WEBHOOK_ADDRESS')}
    # Payload
    payload = {
        "summaryType": "Extractive",
        "utterances": [
            {
                "text": "A knowledge base is an online support library that contains useful 
                        information about your product or service and any related topics. 
                        Commonly referred to as a 'self-service' solution, a knowledge base 
                        lets your customers find answers to their support questions without 
                        having to speak to a person on your team (and taking up their 
                        precious time).  A knowledge base can include any variety of 
                        resources that help customers get the most from a product or service, 
                        including how-to guides, video tutorials, FAQs, white papers, case 
                        studies, and even user forums.  Unlike marketing materials and 
                        onboarding sequences, knowledge bases provide comprehensive and 
                        detailed information about all aspects of a company's products and 
                        customer service.  For example, you might include in-depth 
                        documentation about how to troubleshoot different product issues, 
                        as well as knowledge base articles explaining your payment structures 
                        and refund policies."
            }
        ]
    }

    try:
        # Instantiate Ringcentral SDK 
        rcsdk = SDK( os.getenv('RC_CLIENT_ID'),os.getenv('RC_CLIENT_SECRET'),os.getenv('RC_SERVER_URL'))
        platform = rcsdk.platform()
        # Login Using JWT
        platform.login( jwt=os.getenv('RC_JWT') );
        # Make HTTP POST call to the Conversational Summarization endpoint with the query string and payload
        response = platform.post(endpoint, payload, querystring);
        print(response.json());

    except Exception as e:
        print(e)

try:
    conversationalSummary()
except Exception as e:
    print(e)
