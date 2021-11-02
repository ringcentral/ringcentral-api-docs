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
  create_team()
})

async function create_team() {
  var endpoint = "/restapi/v1.0/glip/teams"
  var params = {
    public: true,
    name: "Fun team",
    members: [{ email: "member.1@gmail.com" }, { email: "member.2@gmail.com" }],
    description: "Let's chit chat here"
  }
  try {
    var resp = await platform.post(endpoint, params)
    var jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj))
  } catch (e) {
    console.log(e)
  }
}
