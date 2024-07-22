const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, () => {
    var endpoint = "/team-messaging/v1/chats"
    platform.get(endpoint, { type: 'Personal' } )
	.then(function(resp){
	    var json = resp.json()
	    var chat_id = json['records'][0]['id']
	    console.log("Personal chat ID: " + chat_id)
	    post_text_message( chat_id )
	})
})

function post_text_message(chat_id) {
    platform.post('/team-messaging/v1/chats/'+chat_id+'/posts', {
	text: "Hello World"
    })
	.then(function(resp){
            var json = resp.json()
            var id = json['id']
            console.log("Posted message successfully, id: " + id)
	})
	.catch(function(e){
            console.log(e)
	})
}
