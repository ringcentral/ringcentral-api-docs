const RC = require('@ringcentral/sdk').SDK
const Subscriptions = require('@ringcentral/subscriptions').Subscriptions
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_USER_JWT })

var subscriptions = new Subscriptions({ sdk: rcsdk });
var subscription = subscriptions.createSubscription();

platform.on(platform.events.loginSuccess, () => {
  subscribe_for_SMS_notification()
});

async function subscribe_for_SMS_notification() {
    subscription.on(subscription.events.notification, evt => {
	    console.log(JSON.stringify(evt, null, 2));
    });
    await subscription
        .setEventFilters(['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'])
        .register()
        .then(function(subscriptionResponse) {
            console.log("Ready to receive incoming SMS via WebSocket.")
        })
        .catch(function(e) {
            console.error(e);
            throw e;
        });
}
