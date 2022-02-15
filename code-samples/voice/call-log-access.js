const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

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

var permissions = []

platform.on(platform.events.loginSuccess, async function(response) {
  var responseJson = response.json();
  // Sanity check
  if (responseJson.hasOwnProperty('scope')) {
    permissions = responseJson.scope.split(" ");
    if (permissions.indexOf('ReadCallLog' >= 0)) {
      try {
        var resp = await platform.get('/restapi/v1.0/account/~/call-log')
        var jsonObj = await resp.json()
        console.log('Account level call log data');
        console.log(jsonObj);
      } catch (e) {
        console.log(e.message)
      }
    }
  }
})
