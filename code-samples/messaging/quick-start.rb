require 'ringcentral'
require 'dotenv/load'

RECIPIENT    = ENV['SMS_RECIPIENT']

$rc = RingCentral.new( ENV['RC_CLIENT_ID'],
                       ENV['RC_CLIENRT_SECRET'],
                       ENV['RC_SERVER_URL'] )

$rc.authorize(jwt: ENV['RC_JWT'])

def read_extension_phone_number()
  resp = $rc.get('/restapi/v1.0/account/~/extension/~/phone-number')
  for record in resp.body['records'] do
    for feature in record['features'] do
      if feature == "SmsSender"
        return send_sms(record['phoneNumber'])
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
