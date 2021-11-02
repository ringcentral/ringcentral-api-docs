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
