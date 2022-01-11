const RC   = require('@ringcentral/sdk').SDK;
const Subscriptions = require('@ringcentral/subscriptions').Subscriptions;

const CLIENTID     = process.env.RC_CLIENT_ID;
const CLIENTSECRET = process.env.RC_CLIENT_SECRET;
const SERVER       = process.env.RC_SERVER_URL;
const USERNAME     = process.env.RC_USERNAME;
const PASSWORD     = process.env.RC_PASSWORD;
const EXTENSION    = process.env.RC_EXTENSION;

const rcsdk = new RC({
    server:       SERVER,
    clientId:     CLIENTID,
    clientSecret: CLIENTSECRET
});

const platform = rcsdk.platform();

platform.login({
    username:  USERNAME,
    password:  PASSWORD,
    extension: EXTENSION
});

const subscriptions = new Subscriptions({ sdk: rcsdk });
const subscription = subscriptions.createSubscription({
    pollInterval: 10 * 1000, renewHandicapMs: 2 * 60 * 1000
});

platform.on(platform.events.loginSuccess, subscribeForSMSNotification);

function subscribeForSMSNotification() {
  try {
      subscription.setEventFilters(['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS']).register();
      console.log('Ready to receive incoming SMS via PubNub.')
  } catch (e) {
    console.error(e);
    // Remove the below line if you are running this in the browser
    process.exit(1);
  }
}

subscription.on(subscription.events.notification, function(msg) {
  console.log(msg.body);
});
