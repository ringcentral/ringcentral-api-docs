const RC  = require('ringcentral')
var fs    = require('fs')
var https = require('https');

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
}).then(
    function(resp) {
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
    }
)

