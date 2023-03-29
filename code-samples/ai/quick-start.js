const RC = require('@ringcentral/sdk').SDK;
require('dotenv').config();

// Read instructions on running code samples to include all required variables
// https://developers.ringcentral.com/guide/basics/code-samples
NGROK       = "<INSERT NGROK URL>"
WEBHOOK_URL = NGROK + "/webhook";
CONTENT_URI = 'https://github.com/ringcentral/ringcentral-api-docs/blob/main/resources/sample1.wav?raw=true'

// Initialize the RingCentral SDK and Platform
const rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});

const platform = rcsdk.platform();
platform.login({'jwt':  process.env.RC_JWT})
platform.on(platform.events.loginSuccess, () => {
    speechToText();
})

async function speechToText() {
    try {
        console.log("Calling RingCentral Speech To Text API");
        let resp = await platform.post("/ai/audio/v1/async/speech-to-text?webhook=" + WEBHOOK_URL, {
            "contentUri":               CONTENT_URI,
            "encoding":                 "Wav",
            "languageCode":             "en-US",
            "source":                   "RingCentral",
            "audioType":                "Meeting",
            "enablePunctuation":        true,
            "enableSpeakerDiarization": false
        });
	let json = await resp.json();
        console.log("Request: " + resp.statusText);
	console.log("Status code: " + resp.status);
        if (resp.status == 202) {
	    console.log("Job ID: " + json.jobId);
            console.log("Ready to receive response at: " + WEBHOOK_URL);
        } else {
            console.log("An error occurred posting the request.");
        }
    } 
    catch (e) {
        console.log("An error occurred : " + e.message);
    }
}
