const RC = require('@ringcentral/sdk').SDK

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET,
    'redirectUri':  process.env.RC_REDIRECT_URI
});
var platform = rcsdk.platform();

console.log( "Login URL: ", platform.loginUrl({
    "state": "1234567890",
    "usePKCE": true
}) )
