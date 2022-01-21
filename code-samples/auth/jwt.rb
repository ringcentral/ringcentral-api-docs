require 'ringcentral'
require 'dotenv/load'

RECIPIENT = ENV['RINGOUT_RECIPIENT']

$rc = RingCentral.new(ENV['RC_CLIENT_ID'],
                      ENV['RC_CLIENRT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_JWT'])

puts "Login with JWT successful."
