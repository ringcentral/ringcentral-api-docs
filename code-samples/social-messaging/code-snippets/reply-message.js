var platform = require('./../quick-start.js').platform;
reply_message("65ef2ffea757720007399854")






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    reply_message("A-Valid-Message-Id")
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Reply to a message.
*/
async function reply_message(messageId){
  try {
    var bodyParams = {
        inReplyToContentId: messageId,
        body: "Thank you for your message! Node JS",
        templateLanguage: "en",
        autoSubmitted: true,
        public: false,
      }
    let endpoint = "/cx/social-messaging/v1/contents"
    var resp = await platform.post(endpoint, bodyParams)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  } catch (e){
    console.log("Unable to reply a message. Error message:", e.message)
  }
}
