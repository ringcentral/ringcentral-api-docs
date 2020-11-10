const RC = require('ringcentral')
var https = require('https');

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

CHAT_ID = '<CHAT TO ADD MEMBERS TO>'

var rcsdk = new RC({
    server: RINGCENTRAL_SERVER,
    appKey: RINGCENTRAL_CLIENTID,
    appSecret: RINGCENTRAL_CLIENTSECRET
});
var platform = rcsdk.platform();
platform.login({
        username: RINGCENTRAL_USERNAME,
        password: RINGCENTRAL_PASSWORD,
        extension: RINGCENTRAL_EXTENSION
    })
    .then(
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
    );
