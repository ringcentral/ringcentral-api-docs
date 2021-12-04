require 'ringcentral'
require 'dotenv/load'

$rc = RingCentral.new(ENV['RC_CLIENT_ID'],
                      ENV['RC_CLIENRT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(username: ENV['RC_USERNAME'],
              extension: ENV['RC_EXTENSION'],
              password: ENV['RC_PASSWORD'])

resp = $rc.post('/restapi/v1.0/glip/teams', payload: {
    public: true,
    name: "Fun team",
    members: [{ email: "member.1@gmail.com"}, {email:"member.2@gmail.com"}],
    description: "Let's chit chat here"
})

puts resp.body
