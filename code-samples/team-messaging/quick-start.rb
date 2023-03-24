#!usr/bin/ruby

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

$rc = RingCentral.new(ENV['RC_CLIENT_ID'],
                      ENV['RC_CLIENRT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_JWT'])

resp = $rc.post('/team-messaging/v1/teams', payload: {
    public: true,
    name: "Fun team",
    members: [{ email: "member.1@gmail.com"}, {email:"member.2@gmail.com"}],
    description: "Let's chit chat here"
})

puts resp.body
