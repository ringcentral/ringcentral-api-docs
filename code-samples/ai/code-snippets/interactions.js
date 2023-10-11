const fs = require ('fs')
var platform = require('./../quick-start.js').platform;
NGROK =process.env.NGROK_URL // "http://d973-73-170-11-87.ngrok-free.app"
WEBHOOK_URL = NGROK + "/webhook";
CONTENT_URI = 'https://rclabs-addin-resources.s3.us-east-1.amazonaws.com/media/Sample%20Call%20Tech%20Support.mp3'
analyze_interaction()


// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    analyze_interaction()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});


//NGROK = "http://xxx-xx-xxx-xx-xx.ngrok-free.app"
//WEBHOOK_URL = NGROK + "/webhook";
//CONTENT_URI = 'https://rclabs-addin-resources.s3.us-east-1.amazonaws.com/media/Plumbing-Call-Recording.mp3'

/*
* Transcribe a call recording and analyze interaction
*/
async function analyze_interaction() {
    var at = await platform.auth().data()
    try {
      let bodyParams = {
          contentUri:                   CONTENT_URI,
          encoding:                     "Mpeg",
          languageCode:                 "en-US",
          source:                       "RingCentral",
          audioType:                    "CallCenter",
          insights:                     [ "All" ],
          enableVoiceActivityDetection: true,
          separateSpeakerPerChannel:    false
      }
      let endpoint = `/ai/insights/v1/async/analyze-interaction?webhook=${WEBHOOK_URL}`
      console.log(endpoint)
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
