#!/usr/bin/env python
from ringcentral import SDK
import os,sys
from dotenv import load_dotenv
load_dotenv()

rcsdk = SDK(os.environ.get('RC_CLIENT_ID'),
            os.environ.get('RC_CLIENT_SECRET'),
            os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
 
try:
  platform.login( jwt=os.environ.get('RC_JWT') )

except:
  sys.exit("Unable to authenticate to platform. Check credentials.")

try:
    response = platform.get('/restapi/v1.0/account/~/extension/~/message-store',
	                    {
	                        'messageType': ['SMS']
	                    })
except Exception as e:
    sys.exit( e )
else:   
    print( response.text() )
    sys.exit(0)
