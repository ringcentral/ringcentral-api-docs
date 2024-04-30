#!usr/bin/ruby

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

$rc = RingCentral.new(ENV['RC_CLIENT_ID'],
                      ENV['RC_CLIENRT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_JWT'])

resp = $rc.post('/rcvideo/v2/account/~/extension/~/bridges', payload: {
    'name': 'Test Meeting'
})

puts "Start your meeting: " + resp.body['discovery']['web']

