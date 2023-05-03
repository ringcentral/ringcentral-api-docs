const RC = require('@ringcentral/sdk').SDK
const Subs = require('@ringcentral/subscriptions').Subscriptions
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

var subscriptions = new Subs({ sdk: rcsdk });
var subscription = subscriptions.createSubscription({
    pollInterval: 10 * 1000, renewHandicapMs: 2 * 60 * 1000
});

platform.on(platform.events.loginSuccess, () => {
  subscribe_for_SMS_notification()
});

function subscribe_for_SMS_notification() {
  subscription.setEventFilters(['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'])
    .register()
    .then(function(subscriptionResponse) {
      console.log("Ready to receive incoming SMS via PubNub.")
    })
    .catch(function(e) {
      console.error(e);
      throw e;
    });
}

subscription.on(subscription.events.notification, function(msg) {
  console.log(msg.body);
});
