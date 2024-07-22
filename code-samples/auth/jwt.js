require('dotenv').config();

const RC = require('@ringcentral/sdk').SDK
var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();

platform.login({
    'jwt':  process.env.RC_USER_JWT
})

platform.on(platform.events.loginSuccess, function(e){
    console.log("User logged in successfully")
});
