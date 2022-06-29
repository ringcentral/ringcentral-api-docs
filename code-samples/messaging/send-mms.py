#!/usr/bin/env python
from ringcentral import SDK
import os,sys


# Provide the server_url, your client_id and client_secret.
# You get these parameters from your application dashbord in your developer account, for example
# server_url for production: https://platform.ringcentral.com
# server_url for sandbox: https://platform.devtest.ringcentral.com
rcsdk = SDK( 'client_id',
             'client_secret',
             'server_url' )
platform = rcsdk.platform()

try:
  platform.login('username',
                'extension_number',
                'password') 
except:
  sys.exit("Unable to authenticate to platform. Check credentials.")

#On login success fetch the 'from_number' that the logged in user is allowed to 
#send SMS from by looking for "MmsSender" feature
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
  sys.exit("No SMS-enabled phone number found")

#Send the actual MMS message by providing the 'recipient_phone_number'. 
#This 'recipient_phone_number' can be any working phone number.
def send_mms(fromNumber):
    builder = rcsdk.create_multipart_builder()
    builder.set_body({
    'from': {'phoneNumber': fromNumber},
    'to': [{'phoneNumber': "recipient_phone_number"}],
    'text': "Hello World"
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