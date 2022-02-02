require('dotenv').config();
const RC = require('ringcentral')

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
    get_teams("")
})

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
