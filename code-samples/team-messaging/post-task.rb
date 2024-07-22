#!usr/bin/ruby

# You get the environment parameters from your
# application dashbord in your developer account
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

CHAT_ID = '<GROUP ID>'

$rc = RingCentral.new(ENV['RC_APP_CLIENT_ID'],
                      ENV['RC_APP_CLIENT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_USER_JWT'])

resp = rc.post('/team-messaging/v1/chats/'+CHAT_ID+'/tasks', payload: {
    "subject": "You need to do X",
    "assignees": {
       "id": "<ID>"
    },
    "description": "In this task assignees will need to do x, y and z."
})

puts resp.body
