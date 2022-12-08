const RC = require('@ringcentral/sdk').SDK;
require('dotenv').config();

MEDIA_URL   = '<INSERT URL TO MEDIA FILE>';
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

// Call the Speaker Enrollment API right after login asynchronously
platform.on(platform.events.loginSuccess, () => {
    enrollSpeaker();
})

async function enrollSpeaker() {
    try {
        console.log("Enrolling speaker using RingCentral Enrollment API");
        let resp = await platform.post("/ai/audio/v1/enrollments?webhook=" + WEBHOOK_URL, {
            "contentUri":   MEDIA_URL,
            "encoding":     "Mpeg",
            "languageCode": "en-US",
            "enrollmentId": "manish3"
        });
        console.log("Job is " + resp.statusText + " with HTTP status code " + resp.status);
    } 
    catch (e) {
        console.log("An error occurred : " + e.message);
    }
}
