#!usr/bin/ruby

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

CALLER    = ENV['RINGOUT_CALLER']
RECIPIENT = ENV['RINGOUT_RECIPIENT']

$rc = RingCentral.new(ENV['RC_CLIENT_ID'],
                      ENV['RC_CLIENRT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_JWT'])

resp = $rc.post('/restapi/v1.0/account/~/extension/~/ring-out', payload: {
    from: { phoneNumber: CALLER },
    to: { phoneNumber: RECIPIENT },
    playPrompt: false
})

puts "Call placed. Call status: " + resp.body['status']['callStatus']
