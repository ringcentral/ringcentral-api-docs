const RC = require('@ringcentral/sdk').SDK
var   fs    = require('fs')
var   https = require('https');
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, () => {
    var endpoint = "/team-messaging/v1/files"
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


