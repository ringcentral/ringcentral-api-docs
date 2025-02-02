const fs = require ('fs')
var platform = require('./../quick-start.js').platform;
NGROK = "http://a44c-73-170-11-87.ngrok-free.app"
WEBHOOK_URL = NGROK + "/webhook";




// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, async () => {
  var tokens = await platform.auth().data()
  var contentUri = `https://media.ringcentral.com/restapi/.../recording/1662272004/content?access_token=${accessToken}`
  // ...
})

platform.on(platform.events.loginError, function(e){
  console.log("Unable to authenticate to platform. Check credentials.", e.message)
  process.exit(1)
});
