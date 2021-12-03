require 'ringcentral'
require 'dotenv/load'

RECIPIENT = ENV['RINGOUT_RECIPIENT']

$rc = RingCentral.new(ENV['RC_CLIENT_ID'],
                      ENV['RC_CLIENRT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(username: ENV['RC_USERNAME'],
              extension: ENV['RC_EXTENSION'],
              password: ENV['RC_PASSWORD'])

resp = $rc.post('/restapi/v1.0/account/~/extension/~/ring-out', payload: {
    from: { phoneNumber: ENV['RC_USERNAME'] },
    to: { phoneNumber: RECIPIENT },
    playPrompt: false
})

puts "Call placed. Call status: " + resp.body['status']['callStatus']
