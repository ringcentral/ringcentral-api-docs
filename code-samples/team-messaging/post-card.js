const RC  = require('ringcentral')
var fs    = require('fs')
var https = require('https');

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'
RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

try {
    const ADAPTIVE_CARD_TEXT = fs.readFileSync('./adaptive-cards/form-submit.json', 'utf8')
    const ADAPTIVE_CARD_JSON = JSON.parse( ADAPTIVE_CARD_TEXT )
    console.log( ADAPTIVE_CARD_JSON )
} catch (err) {
    console.error(err)
}

function post_card(chat_id) {
    platform.post('/restapi/v1.0/glip/chats/'+chat_id+'/posts',
		  ADAPTIVE_CARD_JSON )
	.then(function(resp){
            var json = resp.json()
            var id = json['id']
            console.log("Posted message successfully, id: " + id)
	})
	.catch(function(e){
            console.log(e)
	})
}

var rcsdk = new RC({
    server: RINGCENTRAL_SERVER,
    appKey: RINGCENTRAL_CLIENTID,
    appSecret: RINGCENTRAL_CLIENTSECRET
});
var platform = rcsdk.platform();
platform.login({
    username: RINGCENTRAL_USERNAME,
    password: RINGCENTRAL_PASSWORD,
    extension: RINGCENTRAL_EXTENSION
  })
    .then(
        function(resp) {
            var endpoint = "/restapi/v1.0/glip/chats"
            platform.get(endpoint, { type: 'Personal' } )
		.then(function(resp){
		    var json = resp.json()
		    var chat_id = json['records'][0]['id']
		    console.log("Personal chat ID: " + chat_id)
		    post_card( chat_id )
		})
	});

