require 'ringcentral'
require 'dotenv/load'
$rc = RingCentral.new(ENV['RC_APP_CLIENT_ID'],
                      ENV['RC_APP_CLIENT_SECRET'],
                      ENV['RC_SERVER_URL'])
$rc.authorize(jwt: ENV['RC_USER_JWT'])
puts "Access key: " + $rc.token['access_token']
