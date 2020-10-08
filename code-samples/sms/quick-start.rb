require 'ringcentral'

RECIPIENT = '<ENTER PHONE NUMBER>'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

$rc = RingCentral.new(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
$rc.authorize(username: RINGCENTRAL_USERNAME, extension: RINGCENTRAL_EXTENSION, password: RINGCENTRAL_PASSWORD)

def read_extension_phone_number()
  resp = $rc.get('/restapi/v1.0/account/~/extension/~/phone-number')
  for record in resp.body['records'] do
    if record['usageType'] == "DirectNumber"
      for feature in record['features'] do
        if feature == "SmsSender"
          return send_sms(record['phoneNumber'])
        end
      end
    end
  end
end

def send_sms(phoneNumber)
  resp = $rc.post('/restapi/v1.0/account/~/extension/~/sms', payload: {
        from: {phoneNumber: phoneNumber},
        to: [{phoneNumber: RECIPIENT}],
        text: 'Hello World from Ruby'
    })

  puts "SMS sent. Message status: " + resp.body['messageStatus']
end

read_extension_phone_number()
