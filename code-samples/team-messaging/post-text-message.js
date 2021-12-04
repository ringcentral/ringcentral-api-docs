const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

CLIENTID     = process.env.RC_CLIENT_ID
CLIENTSECRET = process.env.RC_CLIENT_SECRET
SERVER       = process.env.RC_SERVER_URL
USERNAME     = process.env.RC_USERNAME
PASSWORD     = process.env.RC_PASSWORD
EXTENSION    = process.env.RC_EXTENSION

var rcsdk = new RC({
    server:       SERVER,
    clientId:     CLIENTID,
    clientSecret: CLIENTSECRET
});
var platform = rcsdk.platform();
platform.login({
    username:  USERNAME,
    password:  PASSWORD,
    extension: EXTENSION
})

platform.on(platform.events.loginSuccess, () => {
    var endpoint = "/restapi/v1.0/glip/chats"
    platform.get(endpoint, { type: 'Personal' } )
	.then(function(resp){
	    var json = resp.json()
	    var chat_id = json['records'][0]['id']
	    console.log("Personal chat ID: " + chat_id)
	    post_text_message( chat_id )
	})
})

function post_text_message(chat_id) {
    platform.post('/restapi/v1.0/glip/chats/'+chat_id+'/posts', {
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
