const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

CHAT_ID = '<GROUP ID>'

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, () => {
    post_note( CHAT_ID )
})

async function post_note( group ) {
  try {
    var resp = await platform.post('/team-messaging/v1/chats/'+group+'/notes', {
      "title": "This is a note",
      "body": "<strong>heading</strong><br><br>Any HTML can be entered here."
    });
    var jsonObj = await resp.json()
    console.log( JSON.stringify(jsonObj) )
  } catch (e) {
    console.log(e)
  }
}
