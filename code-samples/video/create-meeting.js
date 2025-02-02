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
  create_meeting()
})

async function create_meeting() {
  try {
      // Create POST Request with optional body parameters
      var resp = await platform.post('/rcvideo/v2/account/~/extension/~/bridges', {
          "name": "Weekly Meeting with General Organa",
          "type": "Scheduled",
          "security": {
              "passwordProtected": true,
              "password": "Wq123ygs15",
              "noGuests": false,
              "sameAccount": false,
              "e2ee": false
          },
          "preferences": {
              "join": {
                  "audioMuted": false,
                  "videoMuted": false,
                  "waitingRoomRequired": "Nobody",
                  "pstn": {
                      "promptAnnouncement": true,
                      "promptParticipants": true
                  }
              },
              "playTones": "Off",
              "musicOnHold": true,
              "joinBeforeHost": true,
              "screenSharing": true,
              "recordingsMode": "User",
              "transcriptionsMode": "User",
              "recordings": {
                  "everyoneCanControl": {
                      "enabled": true,
                      "locked": false
                  },
                  "autoShared": {
                      "enabled": true,
                      "locked": false
                  }
              },
              "allowEveryoneTranscribeMeetings": true
          }
      })
      var jsonObj = await resp.json()
      console.log("Start Your Meeting: " + json.discovery.web)
  } catch (e) {
      console.log(e.message)
  }
});
