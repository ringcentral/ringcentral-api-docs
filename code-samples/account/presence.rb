#!usr/bin/ruby

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

SENDER       = ENV['SMS_SENDER']
RECIPIENT    = ENV['SMS_RECIPIENT']

$rc = RingCentral.new( ENV['RC_CLIENT_ID'],
                       ENV['RC_CLIENRT_SECRET'],
                       ENV['RC_SERVER_URL'] )

$rc.authorize( jwt: ENV['RC_JWT'] )

def output_presence()
  $endpoint = "/restapi/v1.0/account/~/presence"
  $payload = { detailedTelephonyState: true }
  
  resp = rc.get($endpoint, payload: $payload )
  
  for record in resp.body['records'] do
    puts record.userStatus
  end
end

output_presence()
