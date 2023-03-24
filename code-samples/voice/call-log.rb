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

resp = $rc.get('/restapi/v1.0/account/~/extension/~/call-log', {
    view: 'Detailed'
})

for record in resp.body['records'] do
    puts "Call type: " + record['type']
end
