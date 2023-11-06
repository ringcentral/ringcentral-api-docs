const RC = require('@ringcentral/sdk').SDK

// Instantiate the SDK and get the platform instance
var rcsdk = new RC({
    server: 'https://platform.devtest.ringcentral.com',
    clientId: 'SANDBOX-APP-CLIENTID',
    clientSecret: 'SANDBOX-APP-CLIENTSECRET'
});
var platform = rcsdk.platform();

/* Authenticate a user using a personal JWT token */
platform.login({ jwt: 'SANDBOX-JWT' })
