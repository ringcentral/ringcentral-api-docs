from ringcentral import SDK

RECIPIENT = '<ENTER PHONE NUMBER>'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

rcsdk = SDK( RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
platform = rcsdk.platform()
platform.login(RINGCENTRAL_USERNAME, RINGCENTRAL_EXTENSION, RINGCENTRAL_PASSWORD)

def read_extension_phone_number():
  resp = platform.get("/restapi/v1.0/account/~/extension/~/phone-number")
  jsonObj = resp.json()
  for record in jsonObj.records:
  if record.usageType == "DirectNumber":
    for feature in record.features:
      if feature == "SmsSender":
        return send_sms(record.phoneNumber)

def send_sms(fromNumber):
  resp = platform.post('/restapi/v1.0/account/~/extension/~/sms',
              {
                  'from' : { 'phoneNumber': fromNumber },
                  'to'   : [ {'phoneNumber': RECIPIENT} ],
                  'text' : 'Hello World from Python'
              })
  jsonObj = resp.json()
  print (jsonObj.messageStatus)

read_extension_phone_number()
