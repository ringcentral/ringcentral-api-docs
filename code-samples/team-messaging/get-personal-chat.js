const RC  = require('ringcentral')
var fs    = require('fs')
var https = require('https');

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'
RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

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
platform.on(platform.events.loginSuccess, () => {
  get_personal_meeting_id()
})

async function get_personal_meeting_id() {
    console.log("Getting personal chat")
    var endpoint = "/restapi/v1.0/glip/chats"
    var params = {
	type: 'Personal'
    }
    try {
	var resp = await platform.get( endpoint, params )
	var json = await resp.json()
	var chat_id = json['records'][0]['id']
	console.log("Personal chat ID: " + chat_id)
    } catch (e) {
        console.log("Error: " + e.message);
    }
}
