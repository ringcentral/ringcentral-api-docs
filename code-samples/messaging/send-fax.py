#!/usr/bin/python

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

import os
import sys
 
from dotenv import load_dotenv
from ringcentral import SDK
 
load_dotenv()

RECIPIENT = os.environ.get('FAX_RECIPIENT')

rcsdk = SDK(os.environ.get('RC_CLIENT_ID'),
            os.environ.get('RC_CLIENT_SECRET'),
            os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
 
try:
  platform.login( jwt=os.environ.get('RC_JWT') )
except Exception as e:
  sys.exit("Unable to authenticate to platform. Check credentials." + str(e))

builder = rcsdk.create_multipart_builder()
builder.set_body({
    'to': [{'phoneNumber': RECIPIENT}],
    'faxResolution': "High",
    'coverPageText': "This is a demo Fax page from Python"
})

attachment = ('test.jpg', open('test.jpg','r').read(), 'image/jpeg')
builder.add(attachment)
    
request = builder.request('/account/~/extension/~/fax')

resp = platform.send_request(request)
print('Fax sent. Message status: ' + resp.json().messageStatus)
