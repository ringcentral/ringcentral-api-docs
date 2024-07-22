const RC = require('@ringcentral/sdk').SDK

// Instantiate the SDK and get the platform instance
var rcsdk = new RC({
    server: "https://platform.ringcentral.com",
    clientId: "RC_APP_CLIENT_ID",
    clientSecret: "RC_APP_CLIENT_SECRET"
});
var platform = rcsdk.platform();

/* Authenticate a user using a personal JWT token */
platform.login({ jwt: "RC_USER_JWT" })

// For the purpose of testing the code, we put the recipient number in the variable.
// Feel free to set the recipient number directly.
var RECIPIENT = "RECIPIENT-PHONE-NUMBER"
