const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, () => {
    platform.get("/restapi/v1.0/glip/chats", {
        "recordCount": 20
    })
        .then(function(resp) {
            var json = resp.json()
            var records = json['records']
            for (i = 0; i < records.length; i++) {
                r = records[i]
                console.log(r["type"] + " chat with "
			    + r["members"].length + " members")
            }
        })
})
