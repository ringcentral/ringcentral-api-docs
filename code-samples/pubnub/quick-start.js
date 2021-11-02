const RC   = require('@ringcentral/sdk').SDK
const Subs = require('@ringcentral/subscriptions').Subscriptions
require('dotenv').config();

CLIENTID     = process.env.RC_CLIENT_ID
CLIENTSECRET = process.env.RC_CLIENT_SECRET
SERVER       = process.env.RC_SERVER_URL
USERNAME     = process.env.RC_USERNAME
PASSWORD     = process.env.RC_PASSWORD
EXTENSION    = process.env.RC_EXTENSION

var rcsdk = new RC({
    server:       SERVER,
    clientId:     CLIENTID,
    clientSecret: CLIENTSECRET
});
var platform = rcsdk.platform();
platform.login({
    username:  USERNAME,
    password:  PASSWORD,
    extension: EXTENSION
})

var subscriptions = new Subscriptions({ sdk: rcsdk });
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
