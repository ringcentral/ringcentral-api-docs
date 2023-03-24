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
    fetch_history()
})

async function fetch_history() {
    try {
	var resp = await platform.get('/rcvideo/v1/history/meetings')
	var jsonObj = await resp.json()
        for (var meeting of jsonObj.meetings){
            console.log("Meeting:")
            console.log("  name: " + record.displayName)
            console.log("  start time: " + record.startTime)
            console.log("  end time: " + record.endTime)
        }
    } catch (e) {
	console.log(e.message)
    }
});
