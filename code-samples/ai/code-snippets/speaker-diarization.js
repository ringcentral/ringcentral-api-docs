const fs = require ('fs')
var platform = require('./../quick-start.js').platform;
NGROK_ADDRESS = process.env.NGROK_URL // "http://d973-73-170-11-87.ngrok-free.app"
WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
CONTENT_URI = 'https://rclabs-addin-resources.s3.us-east-1.amazonaws.com/media/Sample%20Call%20Tech%20Support.mp3'
speakers_recogition()


// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS"
    WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
    CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI"
    speakers_recogition()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Recognize speakers from a conversation
*/
async function speakers_recogition() {
    try {
        let bodyParams = {
            contentUri:   CONTENT_URI,
            encoding:     "Mpeg",
            languageCode: "en-US",
            source:       "RingCentral",
            audioType:    "CallCenter"
        }
        let endpoint = `/ai/audio/v1/async/speaker-diarize?webhook=${WEBHOOK_URL}`
        let resp = await platform.post(endpoint, bodyParams);
        let jsonObj = await resp.json();
        if (resp.status == 202) {
          console.log("Job ID: " + jsonObj.jobId);
          console.log("Ready to receive response at: " + WEBHOOK_URL);
        }
    } catch (e) {
          console.log(`Unable to call speaker diarization API. ${e.message}`);
    }
}
