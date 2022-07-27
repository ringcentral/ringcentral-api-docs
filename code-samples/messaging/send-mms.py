#!/usr/bin/env python
#You get the environment parameters from your 
#application dashbord in your developer account 
#https://developers.ringcentral.com/

from ringcentral import SDK
import os,sys

from dotenv import load_dotenv
load_dotenv()

RECIPIENT    = os.environ.get('SMS_RECIPIENT')

rcsdk = SDK( os.environ.get('RC_CLIENT_ID'),
             os.environ.get('RC_CLIENT_SECRET'),
             os.environ.get('RC_SERVER_URL') )
platform = rcsdk.platform()

try:
  platform.login(os.environ.get('RC_USERNAME'),
                 os.environ.get('RC_EXTENSION'),
                 os.environ.get('RC_PASSWORD') )
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
      if feature == "MmsSender":
        return send_mms(record.phoneNumber)
  sys.exit("No MMS-enabled phone number found")

def send_mms(fromNumber):
    builder = rcsdk.create_multipart_builder()
    builder.set_body({
    'from': {'phoneNumber': fromNumber},
    'to': [{'phoneNumber': RECIPIENT}],
    })
    image = open ('TestImage.jpg', 'rb')
    attachment = ('TestImage.jpg', image, 'image/jpeg')
    builder.add(attachment)
    try:
        request = builder.request('/account/~/extension/~/sms')
        response = platform.send_request(request)
    except Exception as e:
        print(e)


read_extension_phone_number()