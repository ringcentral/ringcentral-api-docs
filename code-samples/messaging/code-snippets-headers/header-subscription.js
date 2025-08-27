const RC = require('@ringcentral/sdk').SDK
const Subscriptions = require('@ringcentral/subscriptions').Subscriptions;

// Instantiate the SDK and get the platform and the subscription instances
const rcsdk = new RC({
    server: "https://platform.ringcentral.com",
    clientId: "RC_APP_CLIENT_ID",
    clientSecret: "RC_APP_CLIENT_SECRET"
});
const subscriptions = new Subscriptions({
   sdk: rcsdk
});

var platform = rcsdk.platform();
var subscription = subscriptions.createSubscription();

/* Authenticate a user using a personal JWT token */
platform.login({ jwt: "RC_USER_JWT" })
