const RC = require('@ringcentral/sdk').SDK;
require('dotenv').config();

const MEDIA_URL   = process.env.RC_MEDIA_URL;
const WEBHOOK_URL = '<INSERT YOUR WEBHOOK URL>';

// Initialize the RingCentral SDK and Platform
const rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});

const platform = rcsdk.platform();

// Authenticate with RingCentral Developer Platform using Developer's JWT Credential
platform.login({
    'jwt': process.env.RC_JWT
});

// Call the Emotion Recognition API right after login asynchronously
platform.on(platform.events.loginSuccess, () => {
    recognizeEmotion();
})

async function recognizeEmotion() {
    try {
        console.log("Calling RingCentral Emotion Recognition API");
        let resp = await platform.post("/ai/audio/v1/async/recognize-emotion?webhook=" + WEBHOOK_URL,
                                       {
                                           "contentUri": MEDIA_URL,
                                           "encoding": "Wav",
                                           "languageCode": "en-US",
                                           "source": "RingCentral",
                                           "audioType": "Meeting"
                                       });
	console.log("Job is " + resp.statusText + " with HTTP status code " + resp.status);
    } 
    catch (e) {
        console.log("An Error Occurred : " + e.message);
    }
}
