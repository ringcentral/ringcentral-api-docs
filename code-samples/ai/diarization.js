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

// Authenticate with RingCentral Developer Platdorm using Developer's JWT Credential
platform.login({
    'jwt': process.env.RC_JWT
});

// Call the Speaker Diarization API right after login asynchronously
platform.on(platform.events.loginSuccess, () => {
    detectSpeaker();
})

async function detectSpeaker() {
    try {
        console.log("Calling RingCentral Speaker Diarization API");
        let resp = await platform.post("/ai/audio/v1/async/speaker-diarize?webhook=" + WEBHOOK_ADDRESS, {
            "contentUri":                   MEDIA_URL,
            "encoding":                     "Mpeg",
            "languageCode":                 "en-US",
            "source":                       "RingCentral",
            "audioType":                    "Meeting",
            "separateSpeakerPerChannel":    false,
            "speakerCount":                 0,
            "enableVoiceActivityDetection": true
        });
        console.log("Job is " + resp.statusText + " with HTTP status code " + resp.status);
    } 
    catch (e) {
        console.log("An error occurred : " + e.message);
    }
}
