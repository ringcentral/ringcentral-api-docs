const RC = require('@ringcentral/sdk').SDK
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

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
