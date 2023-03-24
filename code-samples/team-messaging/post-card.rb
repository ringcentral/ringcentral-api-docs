#!usr/bin/ruby

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

CHAT_ID = '<GROUP ID>'

$rc = RingCentral.new(ENV['RC_CLIENT_ID'],
                      ENV['RC_CLIENRT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_JWT'])

resp = rc.post('/team-messaging/v1/chats/'+CHAT_ID+'/adpative-cards', payload: {
    "type": "AdaptiveCard",
    "body": [
	{
	    "type": "TextBlock",
	    "size": "Medium",
	    "weight": "Bolder",
	    "text": "Adaptive Card example"
	},
	{
	    "type": "Image",
	    "url": "https://bit.ly/3nwZbRM"
	}
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.3"
})

puts resp.body
