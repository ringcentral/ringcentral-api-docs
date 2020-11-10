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
        function(resp) {
            get_teams("")
        }
    );

function get_teams(page) {
    var endpoint = "/restapi/v1.0/glip/teams"
    var opts = { "recordCount": 20 }
    if (page != "") {
        opts["pageToken"] = page
    }
    platform.get(endpoint, opts)
        .then(function(resp) {
            var json = resp.json()
            var records = json['records']
            for (i = 0; i < records.length; i++) {
                r = records[i]
                console.log("Team: " + r["name"])
            }
            var nav = json['navigation']
            var nextPage = nav['prevPageToken']
            if (nextPage) {
                get_teams(nextPage)
            }
        })
}
