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
    post_mention()
})

async function post_mention(){
  try {
    let personId = "1234";
    let groupId = "5678";
    let endpoint = `/team-messaging/v1/chats/${groupId}/posts`
    let bodyParams = {
          text: `Here is a mention: ![:Person](${personId})`
        }
    let resp = await platform.post(endpoint, bodyParams)
    let jsonObj = await resp.json()
    console.log(jsonObj)
  } catch(e) {
    console.log(e.message)
  }
}
