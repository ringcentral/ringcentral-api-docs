const RC = require('@ringcentral/sdk').SDK
const path = require('path')
// Remember to modify the path to where you saved your .env file!
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


// For the purpose of testing the code, we put the deliver address in the environment variable.
// Feel free to set the delivery address directly.
DELIVERY_ADDRESS = process.env.WEBHOOK_DELIVERY_ADDRESS + "/webhook"


// Instantiate the SDK and get the platform instance
var rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_APP_CLIENT_ID,
    'clientSecret': process.env.RC_APP_CLIENT_SECRET
});
var platform = rcsdk.platform();

/* Authenticate a user using a personal JWT token */
platform.login({ 'jwt':  process.env.RC_USER_JWT })

platform.on(platform.events.loginSuccess, function(e){
    subscribe_for_notification()
    //read_subscriptions()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Create a Webhok notification and subscribe for instant SMS message notification
*/
async function subscribe_for_notification() {
  var bodyParams = {
    eventFilters: ['/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'],
    deliveryMode: {
      transportType: "WebHook",
      address: DELIVERY_ADDRESS
    },
    expiresIn: 3600
  }
  try {
    let endpoint = "/restapi/v1.0/subscription"
    var resp = await platform.post(endpoint, bodyParams)
    var jsonObj = await resp.json()
    console.log (`Subscription Id: ${jsonObj.id}`)
    console.log("Ready to receive incoming SMS via WebHook.")
  } catch (e) {
    console.log(e.message);
  }
}

/*
* Read all created subscriptions
*/
async function read_subscriptions(){
  try {
    let endpoint = "/restapi/v1.0/subscription"
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    if (jsonObj.records.length == 0)
      console.log("No subscription.")
    else {
      for (var record of jsonObj.records){
        console.log(record)
        delete_subscription(record.id)
      }
    }
  } catch (e) {
    console.erlogror(e.message);
  }
}

/*
* Delete a subscription identified by the subscription id
*/
async function delete_subscription(subscriptionId){
  try {
    let endpoint = `/restapi/v1.0/subscription/${subscriptionId}`
    var resp = await platform.delete(endpoint)
    console.log (`Subscription ${subscriptionId} deleted.`)
  } catch (e) {
    console.log(e.message);
  }
}
