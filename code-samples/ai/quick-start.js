const RC = require('@ringcentral/sdk').SDK;
require('dotenv').config();

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
        let resp = await platform.post("/ai/audio/v1/async/speech-to-text?webhook=" + WEBHOOK_ADDRESS, {
            "contentUri": "https://github.com/suyashjoshi/ringcentral-ai-demo/blob/master/public/audio/sample1.wav?raw=true",
            "encoding": "Wav",
            "languageCode": "en-US",
            "source": "RingCentral",
            "audioType": "Meeting",
            "enablePunctuation": true,
            "enableSpeakerDiarization": false
        });
        console.log("Speech To Text Job " + resp.statusText + " with HTTP status code " + resp.status);
        if(resp.status == 202){
            console.log("Ready to receive incoming response via WebHook: " + WEBHOOK_ADDRESS + ":" + PORT);
        }
        else{
            console.log("Some error occured. Pls review and try again.");
        }
    } 
    catch (e) {
        console.log("An Error Occurred : " + e.message);
    }
}
