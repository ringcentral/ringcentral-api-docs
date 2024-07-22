#!usr/bin/ruby

# You get the environment parameters from your
# application dashbord in your developer account
# https://developers.ringcentral.com

require 'ringcentral'
require 'subscription'
require 'dotenv'

Dotenv.load

$rc = RingCentral.new(ENV['RC_APP_CLIENT_ID'],
                      ENV['RC_APP_CLIENT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_USER_JWT'])

events = [
  '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS',
]
subscription = WS.new($rc, events, lambda { |message|
  puts message
})
subscription.subscribe()

puts "Waiting for incoming SMS message ..."
while 1
    sleep(5)
end
