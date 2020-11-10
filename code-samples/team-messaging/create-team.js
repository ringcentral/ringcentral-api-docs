const RC = require('ringcentral')
var fs = require('fs')
var https = require('https');
var FormData = require('form-data');

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

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
    );