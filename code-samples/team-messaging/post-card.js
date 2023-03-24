const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

CHAT_ID = '<GROUP ID>'

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, () => {
    post_card( CHAT_ID )
})

async function post_card( group ) {
    try {
	var resp = await platform.post('/restapi/v1.0/glip/chats/'+group+'/adaptive-cards', {
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
	});
	var jsonObj = await resp.json()
	console.log( JSON.stringify(jsonObj) )
    } catch (e) {
	console.log(e)
    }
}
