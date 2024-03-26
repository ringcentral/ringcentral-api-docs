const RC_SDK = require('@ringcentral/sdk').SDK
const path = require('path')
// Remember to modify the path of your .env file location!
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Instantiate the SDK and get the platform instance
var rcsdk = new RC_SDK({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();

/* Authenticate a user using a personal JWT token */
platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, function(e){
    read_user_calllog()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Read user call log between a period of time
*/
async function read_user_calllog() {
  try {
    var queryParams = {
        'dateFrom': "2024-01-01T00:00:00.000Z",
        'dateTo': "2024-01-31T23:59:59.009Z",
        'view': "Detailed"
    }
    var endpoint = "/restapi/v1.0/account/~/extension/~/call-log"
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    for (var record of jsonObj.records)
      console.log(record)
  } catch (e) {
    console.log("Unable to read user call log.", e.message)
  }
}
