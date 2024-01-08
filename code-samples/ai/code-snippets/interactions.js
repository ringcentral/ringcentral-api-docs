const fs = require ('fs')
var platform = require('./../quick-start.js').platform;
NGROK_ADDRESS = process.env.NGROK_URL // ""NGROK-TUNNEL-ADDRESS""
WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
CONTENT_URI = 'https://rclabs-addin-resources.s3.us-east-1.amazonaws.com/media/Never%20Buy%20Sony%20Service.mp3'
analyze_interaction()


// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    NGROK = "NGROK-TUNNEL-ADDRESS"
    WEBHOOK_URL = NGROK + "/webhook";
    CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI"
    analyze_interaction()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Transcribe a call recording and analyze interaction
*/
async function analyze_interaction() {
    try {
      let bodyParams = {
          contentUri:                   CONTENT_URI,
          encoding:                     "Mpeg",
          languageCode:                 "en-US",
          source:                       "RingCentral",
          audioType:                    "Meeting",
          insights:                     [ "All" ],
          enableVoiceActivityDetection: true,
          separateSpeakerPerChannel:    false
      }
      let endpoint = `/ai/insights/v1/async/analyze-interaction?webhook=${WEBHOOK_URL}`
      let resp = await platform.post(endpoint, bodyParams);
      let jsonObj = await resp.json();
      if (resp.status == 202) {
        console.log("Job ID: " + jsonObj.jobId);
        console.log("Ready to receive response at: " + WEBHOOK_URL);
      }
    } catch (e) {
        console.log(`Unable to call this API. ${e.message}`);
    }
}
