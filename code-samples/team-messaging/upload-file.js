const RC    = require('@ringcentral/sdk').SDK
var   fs    = require('fs')
var   https = require('https');

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
    var endpoint = "/restapi/v1.0/glip/files"
    bindata = fs.readFileSync('./cats.png');
    platform.post( endpoint, bindata, {
        name: "cats.png", groupId: '367050754'
    })
        .then( function(resp) {
            var json = resp.json()
            file_id = json[0]['id']
            console.log( "Uploaded file. File ID: " + file_id )
        })
})


