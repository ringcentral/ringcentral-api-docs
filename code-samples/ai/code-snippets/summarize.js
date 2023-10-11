const fs = require ('fs')
var platform = require('./../quick-start.js').platform;
NGROK = "http://01e4-73-170-11-87.ngrok-free.app"
WEBHOOK_URL = NGROK + "/webhook";
conversation_summary("./code-snippets/conversation0.json")

// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    conversation_summary(contentFile)
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});


NGROK = "http://01e4-73-170-11-87.ngrok-free.app"
WEBHOOK_URL = NGROK + "/webhook";

/*
* Transcribe a call recording and analyze interaction
*/
async function conversation_summary(contentFile) {
    try {
      const fs = require('fs')
      const text = fs.readFileSync(contentFile)
      var utterances = JSON.parse(text)
      /*
      console.log(textObj)
      var conversations = []
      for (var item of textObj){
        var line = { text: item }
        conversations.push(line)
      }
      console.log(conversations)
      */
      console.log(utterances)
      //return
      let bodyParams = {
                summaryType: "All",
                utterances: utterances
              }
      let endpoint = `/ai/text/v1/async/summarize?webhook=${WEBHOOK_URL}`
      let resp = await platform.post(endpoint, bodyParams);
      let jsonObj = await resp.json();
      console.log("Request: " + resp.statusText);
      console.log("Status code: " + resp.status);
      if (resp.status == 202) {
        console.log("Job ID: " + jsonObj.jobId);
        console.log("Ready to receive response at: " + WEBHOOK_URL);
      } else {
        console.log("An error occurred posting the request.");
      }
    } catch (e) {
        console.log("An Error Occurred : " + e.message);
    }
}
