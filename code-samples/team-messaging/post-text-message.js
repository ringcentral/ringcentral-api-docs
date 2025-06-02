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
  get_personal_chat_id()
})

async function get_personal_chat_id(){
  try {
    var endpoint = "/team-messaging/v1/chats"
    let resp = await platform.get(endpoint, { type: 'Personal' } )
    let jsonObj =  await resp.json()
    if (jsonObj.records.length > 0){
      let chatId = jsonObj.records[0].id
      console.log("Personal chat ID: " + chatId)
      await post_text_message( chatId )
    }
  }catch(e){
    console.log(e.message)
  }
}

async function post_text_message(chatId) {
  try {
    let endpoint = `/team-messaging/v1/chats/${chatId}/posts`
    let bodyParams = {
      text: "Hello World"
    }
    let resp = await platform.post(endpoint, bodyParams)
  	let jsonObj = await resp.json()
    console.log("Posted message successfully, id: " + jsonObj.id)
  }catch(e){
    console.log(e.message)
	}
}
