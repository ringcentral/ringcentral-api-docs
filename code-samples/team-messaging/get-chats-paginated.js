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
