const SDK = require('@ringcentral/sdk').SDK

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new SDK( {server: RINGCENTRAL_SERVER, clientId: RINGCENTRAL_CLIENTID, clientSecret: RINGCENTRAL_CLIENTSECRET} );
var platform = rcsdk.platform();
platform.login( {username: RINGCENTRAL_USERNAME, password: RINGCENTRAL_PASSWORD, extension: RINGCENTRAL_EXTENSION} )

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
