require 'ringcentral'

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

CHAT_ID = '<GROUP ID>'

rc = RingCentral.new(RINGCENTRAL_CLIENTID, RINGCENTRAL_CLIENTSECRET, RINGCENTRAL_SERVER)
rc.authorize(username: RINGCENTRAL_USERNAME, extension: RINGCENTRAL_EXTENSION, password: RINGCENTRAL_PASSWORD)

resp = rc.post('/restapi/v1.0/glip/chats/'+CHAT_ID+'/adpative-cards', payload: {
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
