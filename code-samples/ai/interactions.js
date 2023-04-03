const RC = require('@ringcentral/sdk').SDK;
require('dotenv').config();

MEDIA_URL   = process.env.RC_MEDIA_URL;
WEBHOOK_URL = '<INSERT YOUR WEBHOOK URL>';

// Initialize the RingCentral SDK and Platform
const rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});

const platform = rcsdk.platform();

// Login into the Developer Portal using Developer's JWT Credential
platform.login({
    'jwt': process.env.RC_JWT
});

// Call the Interaction Analysis API right after login asynchronously
platform.on(platform.events.loginSuccess, () => {
    analyzeInteraction();
})

async function analyzeInteraction() {
    try {
        let resp = await platform.post("/ai/insights/v1/async/analyze-interaction?webhook=" + WEBHOOK_URL,{
            "contentUri":                   MEDIA_URL,
            "encoding":                     "Wav",
            "languageCode":                 "en-US",
            "source":                       "RingCentral",
            "audioType":                    "Meeting",
            "insights":                     [ "All" ],
            "enableVoiceActivityDetection": true,
            "enablePunctuation":            true,
            "enableSpeakerDiarization":     false
        });
        console.log("Job is " + resp.statusText + " with HTTP status code " + resp.status);
    } 
    catch (e) {
        console.log("An Error Occurred : " + e.message);
    }
}
