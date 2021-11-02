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

resp = $rc.post('/restapi/v1.0/glip/teams', payload: {
    public: true,
    name: "Fun team",
    members: [{ email: "member.1@gmail.com"}, {email:"member.2@gmail.com"}],
    description: "Let's chit chat here"
})

puts resp.body
