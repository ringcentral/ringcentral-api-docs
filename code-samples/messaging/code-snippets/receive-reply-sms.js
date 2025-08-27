var platform = require('./../quick-start.js').platform;
var subscription = require('./../quick-start.js').subscription;
subscribe_for_instant_messages_notification()
// download_mms_attachments("")




// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    subscribe_for_instant_messages_notification()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Subscribe for the user instant message event notification
*/
async function subscribe_for_instant_messages_notification(){
  var eventFilters = [ '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS' ]
  subscription.setEventFilters(eventFilters)
  .register()
  .then(function(subscriptionResponse) {
      console.log("Ready to receive SMS message via WebSocket.")
  })
  .catch(function(e) {
    console.error(e.message);
  })
}

/*
*  Receive inbound messages from WebSocket subscription event notification
*/
subscription.on(subscription.events.notification, function(msg) {
    send_reply(msg.body)
});

/*
 Send a reply message to a client number
*/
async function send_reply(body){
  var text = 'Hi'
  if (body.from.name)
    text += ` ${body.from.name}.`

  text += "\nThank you for your message. I’m currently on vacation and will be available after August 15th."
  let bodyParams = {
           from: {phoneNumber: body.to[0].phoneNumber},
           to: [ {phoneNumber: body.from.phoneNumber}],
           text: text
         }

  try{
    let endpoint = "/restapi/v1.0/account/~/extension/~/sms"
    await refresh_token()
    var resp = await platform.post(endpoint, bodyParams)
  }catch(e){
    console.log(`Unable to send a reply message to ${bodyParams.to[0].phoneNumber}. Error message:`, e.message)
  }
}

async function refresh_token(){
  if (await platform.loggedIn() == false){
    console.log("Both tokens expired => Relogin using the user JWT.")
    await platform.login( { jwt: "RC_USER_JWT" })
  }else{
    console.log("Token valid")
  }
}
