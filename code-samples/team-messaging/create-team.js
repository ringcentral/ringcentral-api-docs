const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

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
