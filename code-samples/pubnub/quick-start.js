const SDK = require('@ringcentral/sdk').SDK
const Subscriptions = require('@ringcentral/subscriptions').Subscriptions

RINGCENTRAL_CLIENTID = '<ENTER CLIENT ID>'
RINGCENTRAL_CLIENTSECRET = '<ENTER CLIENT SECRET>'
RINGCENTRAL_SERVER = 'https://platform.devtest.ringcentral.com'

RINGCENTRAL_USERNAME = '<YOUR ACCOUNT PHONE NUMBER>'
RINGCENTRAL_PASSWORD = '<YOUR ACCOUNT PASSWORD>'
RINGCENTRAL_EXTENSION = '<YOUR EXTENSION, PROBABLY "101">'

var rcsdk = new SDK({ server: RINGCENTRAL_SERVER, clientId: RINGCENTRAL_CLIENTID, clientSecret: RINGCENTRAL_CLIENTSECRET });
var platform = rcsdk.platform();

var subscriptions = new Subscriptions({ sdk: rcsdk });
var subscription = subscriptions.createSubscription({ pollInterval: 10 * 1000, renewHandicapMs: 2 * 60 * 1000 });

platform.login({ username: RINGCENTRAL_USERNAME, password: RINGCENTRAL_PASSWORD, extension: RINGCENTRAL_EXTENSION })

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