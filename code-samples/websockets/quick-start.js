const RC = require('@ringcentral/sdk').SDK
const Subscriptions = require('@ringcentral/subscriptions').Subscriptions
require('dotenv').config();

var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();
platform.login({ 'jwt':  process.env.RC_JWT })

var subscriptions = new Subscriptions({ sdk: rcsdk });
var subscription = subscriptions.createSubscription({
    pollInterval: 10 * 1000, renewHandicapMs: 2 * 60 * 1000
});

platform.on(platform.events.loginSuccess, () => {
  subscribe_for_SMS_notification()
});

function subscribe_for_SMS_notification() {
    const subscription = subscriptions.createSubscription();
    subscription.on(subscription.events.notification, evt => {
	console.log(JSON.stringify(evt, null, 2));
    });
    await subscription
	.setEventFilters(['/restapi/v1.0/account/~/extension/~/message-store'])
	.register();
    
    // trigger an event, optional
    const r = await platform.get('/restapi/v1.0/account/~/extension/~');
    const ext = await r.json();
    platform.post('/restapi/v1.0/account/~/extension/~/company-pager', {
	from: {extensionId: ext.id},
	to: [{extensionId: ext.id}],
	text: 'Hello world!',
    });
}

subscription.on(subscription.events.notification, function(msg) {
  console.log(msg.body);
});
