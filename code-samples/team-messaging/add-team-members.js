const RC  = require('ringcentral')
require('dotenv').config();

CHAT_ID      = '<CHAT TO ADD MEMBERS TO>'
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
