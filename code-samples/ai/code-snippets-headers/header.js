const fs = require ('fs')
const RC = require('@ringcentral/sdk').SDK

// Instantiate the SDK and get the platform instance
var rcsdk = new RC({
    server: 'https://platform.ringcentral.com',
    clientId: 'RC_APP_CLIENT_ID',
    clientSecret: 'RC_APP_CLIENT_SECRET'
});
var platform = rcsdk.platform();

/* Authenticate a user using a personal JWT token */
platform.login({ jwt: 'RC_USER_JWT' })
