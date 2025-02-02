require 'ringcentral'
require 'dotenv/load'

$rc = RingCentral.new( ENV['RC_APP_CLIENT_ID'],
                       ENV['RC_APP_CLIENT_SECRETCLIENRT_SECRET'],
                       ENV['RC_SERVER_URL'] )

$rc.authorize(jwt: ENV['RC_USER_JWT'])

resp = $rc.post('/restapi/v1.0/account/~/extension/~/meeting', payload: {
    topic: 'Ruby Meeting 1',
    meetingType: 'Instant',
    allowJoinBeforeHost: true,
    startHostVideo: true,
    startParticipantsVideo: false
})

puts "Start Your Meeting: " + resp.body['links']['startUri']
puts "Join the Meeting: " + resp.body['links']['joinUri']
