#!usr/bin/ruby

# You get the environment parameters from your
# application dashbord in your developer account
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

$rc = RingCentral.new(ENV['RC_APP_CLIENT_ID'],
                      ENV['RC_APP_CLIENT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_USER_JWT'])

params = {
    phoneNumber: '11235557890',
    type: 'Other',
    label: 'My ATT number'
}
resp = $rc.post('/restapi/v1.0/account/~/extension/~/forwarding-number',
                payload: params)

puts 'Forwarding number created.'
puts resp.body['id']
