const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({
    'jwt': process.env.RC_JWT
})

platform.on(platform.events.loginSuccess, () => {
      start_meeting()
});

async function start_meeting(){
  try{
    var endpoint = "/restapi/v1.0/account/~/extension/~/meeting"
    var resp = await platform.post(endpoint, {
              topic: 'Test Meeting',
              meetingType: 'Instant',
              allowJoinBeforeHost: true,
              startHostVideo: true,
              startParticipantsVideo: false

        })
    var jsonObj = await resp.json()
    console.log( 'Start Your Meeting: ' + jsonObj.links.startUri )
    console.log( 'Meeting id: ' + jsonObj.id )
  }catch(e){
    console.log(e.message)
  }
}
