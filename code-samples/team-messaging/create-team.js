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
    platform.post("/restapi/v1.0/glip/teams", {
        "name": "The second Death Star",
        "description": "Another Death Star!? Are you kidding?",
        "public": true,
        "members": [
            { "id": 1 },
            { "email": "luke.skywalker@rebelalliance.org" },
            { "email": "han.solo@rebelalliance.org" }
        ]
    })
        .then(function(resp) {
            var json = resp.json()
            console.log("Team #" + json['id'] + " created.")
        })
})
