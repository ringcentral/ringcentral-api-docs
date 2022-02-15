const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

RECIPIENT    = process.env.RECIPIENT_PHONE
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

platform.on(platform.events.loginSuccess, async function(e) {
    try {
      var resp = await platform.get('/restapi/v1.0/account/~/extension/~/message-store', {
        dateFrom: '2018-04-20T06:33:00.000Z'
      })
      var jsonObj = await resp.json()
      const messages = jsonObj.records
      console.log(`We get of a list of ${messages.length} messages`)
      const message = messages[0]
      var resp = await platform.delete( `/restapi/v1.0/account/~/extension/~/message-store/${message.id}` )
      var jsonObj = await resp.json()
      console.log(`Message ${message.id} has been deleted`)
    } catch (e) {
	console.error(e)
    }
})
