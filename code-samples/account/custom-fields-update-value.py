#!/usr/bin/python

# You get the environment parameters from your
# application dashbord in your developer account
# https://developers.ringcentral.com

import os
import sys

from dotenv import load_dotenv
from ringcentral import SDK
load_dotenv()

rcsdk = SDK( os.environ.get('RC_APP_CLIENT_ID'),
             os.environ.get('RC_APP_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
try:
  platform.login( jwt=os.environ.get('RC_USER_JWT') )
except Exception as e:
  sys.exit("Unable to authenticate to platform: " + str(e))

# POST Body
body =  {
    "customFields": [
        {
            "id":"64016",
            "value":"Test for Update"
        }
    ]
}

try:
    response =  platform.put('/account/~/extension/~', body)
    user = response.json()
    print('Custom Field value updated for Custom Field id 64016')
    for x in user.customFields:
        print('Display Name: ' + x.displayName + '\n')
        print('  ID: ' + x.id + '\n')
        print('  Value: ' + x.value + '\n')
        print('  Category: ' + x.category + '\n\n' )
except Exception as e:
    print("Error while updatibg custom field value" + e)
