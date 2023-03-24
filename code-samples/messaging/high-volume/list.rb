#!usr/bin/ruby

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

$rc = RingCentral.new( ENV['RC_CLIENT_ID'],
                       ENV['RC_CLIENRT_SECRET'],
                       ENV['RC_SERVER_URL'] )

$rc.authorize( jwt: ENV['RC_JWT'] )
response = $rc.get ('/restapi/v1.0/account/~/extension/~/phone-number')

for record in response.body['records'] do
  for feature in record['features'] do
    if feature == "A2PSmsSender"
      if record.paymentType == "TollFree"
      	puts "This phone number " + record['phoneNumber'] + " is a toll-free number and provisioned for using to send high volume SMS"
      else
      	puts "This phone number " + record['phoneNumber'] + " is a 10-DLC local number and provisioned for using to send high volume SMS"
      end
    end
  end
end
