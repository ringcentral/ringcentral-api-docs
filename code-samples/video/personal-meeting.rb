require 'ringcentral'
require 'dotenv/load'

RECIPIENT = ENV['RINGOUT_RECIPIENT']

$rc = RingCentral.new(ENV['RC_CLIENT_ID'],
                      ENV['RC_CLIENRT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(username: ENV['RC_USERNAME'],
              extension: ENV['RC_EXTENSION'],
              password: ENV['RC_PASSWORD'])

resp = $rc.get('/rcvideo/v2/account/~/extension/~/bridges/default')

puts "Your personal meeting URL is: " + resp.body['discovery']['web']
