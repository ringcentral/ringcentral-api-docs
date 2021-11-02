require 'ringcentral'
require 'dotenv/load'

CLIENTID     = ENV['RC_CLIENT_ID']
CLIENTSECRET = ENV['RC_CLIENRT_SECRET']
SERVER       = ENV['RC_SERVER_URL']
USERNAME     = ENV['RC_USERNAME']
PASSWORD     = ENV['RC_PASSWORD']
EXTENSION    = ENV['RC_EXTENSION']

$rc = RingCentral.new(CLIENTID, CLIENTSECRET, SERVER)
$rc.authorize(username: USERNAME, extension: EXTENSION, password: PASSWORD)

resp = $rc.post('/restapi/v1.0/account/~/extension/~/meeting', payload: {
    topic: 'Ruby Meeting 1',
    meetingType: 'Instant',
    allowJoinBeforeHost: true,
    startHostVideo: true,
    startParticipantsVideo: false
})

puts "Start Your Meeting: " + resp.body['links']['startUri']
puts "Join the Meeting: " + resp.body['links']['joinUri']
