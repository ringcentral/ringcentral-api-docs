#!usr/bin/ruby

# You get the environment parameters from your
# application dashbord in your developer account
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

CHAT_ID = '<GROUP ID>'

$rc = RingCentral.new(ENV['RC_APP_CLIENT_ID'],
                      ENV['RC_APP_CLIENT_SECRETCLIENRT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_USER_JWT'])

resp = rc.post('/team-messaging/v1/chats/'+CHAT_ID+'/notes', payload: {
    "title": "This is a note",
    "body": "<strong>heading</strong><br><br>Any HTML can be entered here."
})

puts resp.body
