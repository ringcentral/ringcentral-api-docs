const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({
    'username':  process.env.RC_USERNAME,
    'password':  process.env.RC_PASSWORD,
    'extension': process.env.RC_EXTENSION
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
