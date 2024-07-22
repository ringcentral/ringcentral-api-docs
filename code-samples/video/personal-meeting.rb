#!usr/bin/ruby

# You get the environment parameters from your
# application dashbord in your developer account
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

$rc = RingCentral.new(ENV['RC_APP_CLIENT_ID'],
                      ENV['RC_APP_CLIENT_SECRETCLIENRT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_USER_JWT'])

resp = $rc.get('/rcvideo/v2/account/~/extension/~/bridges/default')

puts "Your personal meeting URL is: " + resp.body['discovery']['web']
