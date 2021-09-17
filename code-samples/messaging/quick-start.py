#!/usr/bin/env python
# quick-start.py - This script helps developers send their first SMS message
#
# Variables:
# RC_CLIENT_ID, RC_CLIENT_SECRET, RC_SERVER_URL: Connection info
# RC_USERNAME, RC_PASSWORD, RC_EXTENSION: Auth credentials
# RECIPIENT_PHONE: The phone number to send the SMS to
#
# License: MIT
# Copyright: 2021 RingCentral, Inc. 
from ringcentral import SDK
import os,sys

CLIENTID     = os.environ.get('RC_CLIENT_ID')
CLIENTSECRET = os.environ.get('RC_CLIENT_SECRET')
SERVER       = os.environ.get('RC_SERVER_URL')
USERNAME     = os.environ.get('RC_USERNAME')
PASSWORD     = os.environ.get('RC_PASSWORD')
EXTENSION    = os.environ.get('RC_EXTENSION')
RECIPIENT    = os.environ.get('RECIPIENT_PHONE')

rcsdk = SDK( CLIENTID, CLIENTSECRET, SERVER )
platform = rcsdk.platform()
try:
  platform.login(USERNAME, EXTENSION, PASSWORD)
except:
  sys.exit("Unable to authenticate to platform. Check credentials.")

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
                  'from' : { 'phoneNumber': fromNumber },
                  'to'   : [ {'phoneNumber': RECIPIENT} ],
                  'text' : 'Hello World from Python'
              })
    jsonObj = resp.json()
  except:
    sys.exit("Unable to send SMS")
  print (jsonObj.messageStatus)

read_extension_phone_number()
