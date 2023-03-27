#!/usr/bin/python

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

import os
import sys
 
from dotenv import load_dotenv
from ringcentral import SDK
 
load_dotenv()

SENDER       = os.environ.get('SMS_SENDER')
RECIPIENT    = os.environ.get('SMS_RECIPIENT')

rcsdk = SDK(os.environ.get('RC_CLIENT_ID'),
            os.environ.get('RC_CLIENT_SECRET'),
            os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()
 
try:
  platform.login( jwt=os.environ.get('RC_JWT') )
except Exception as e:
  sys.exit("Unable to authenticate to platform. Check credentials." + str(e))

def read_extension_phone_number():
  try:
    resp = platform.get("/restapi/v1.0/account/~/extension/~/phone-number")
    jsonObj = resp.json()
  except e:
    sys.exit("Unable to fetch SMS-enabled phone numbers")
  for record in jsonObj.records:
    for feature in record.features:
      if feature == "SmsSender":
        return send_sms(record.phoneNumber)
  sys.exit("No SMS-enabled phone number found")

def send_sms(fromNumber):
  try:
    resp = platform.post('/restapi/v1.0/account/~/extension/~/sms',
    {
        'from' : { 'phoneNumber': SENDER },
        'to'   : [ {'phoneNumber': RECIPIENT} ],
        'text' : 'Hello World!'
    })
    jsonObj = resp.json()
  except:
    sys.exit("Unable to send SMS")
  print (jsonObj.messageStatus)

read_extension_phone_number()
