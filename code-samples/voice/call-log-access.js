const RingCentral = require('@ringcentral/sdk').SDK
var rcsdk = new RingCentral({
    server: 'https://platform.devtest.ringcentral.com', // for Production: https://platform.ringcentral.com
  clientId: '{{REPLACE_WITH_YOUR_APP_KEY}}',
  clientSecret: '{{REPLACE_WITH_YOUR_APP_SECRET}}'
});

var platform = rcsdk.platform();
var permissions = []

platform.login({
  username: '{{REPLACE_WITH_YOUR_USERNAME}}',
  password: '{{REPLACE_WITH_YOUR_PASSWORD}}',
  extension: '{{OPTIONAL_REPLACE_WITH_YOUR_EXTENSION}}'
})

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
