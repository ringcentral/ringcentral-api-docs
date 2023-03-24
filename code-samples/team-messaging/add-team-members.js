const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

CHAT_ID      = '<CHAT TO ADD MEMBERS TO>'

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, () => {
    platform.post("/restapi/v1.0/glip/teams/" + CHAT_ID + "/add", {
        "members": [
            { "id": 1 },
            { "id": 2 },
            { "id": 283 },
            { "email": "mando@mandalorians.net" }
        ]
    })
        .then(function(resp) {
            console.log("Team members added.")
        })
})
