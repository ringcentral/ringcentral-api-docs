const RC = require('@ringcentral/sdk').SDK;
require('dotenv').config();

// replace with your ngrok address below
const WEBHOOK_URL = "YOUR NGROK HTTPS URL" + "/webhook";

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

// Call the Speech to Text API right after login asynchronously
platform.on(platform.events.loginSuccess, () => {
    punctuateText();
});

async function punctuateText() {
    try {
        let resp = await platform.post("/ai/text/v1/async/punctuate?webhook=" + WEBHOOK_URL, {
            texts: [
                "so its more fluid than it is and you know its not the best kind of feedback right",
                "and you know that the best way to ask for customer feedback is to reach out to each of your customer and interview them separately",
                "however interviewing each individual customer to get their feedback is not scalable if you have thousands of customers to be interviewed"
            ]
        });
        console.log("Job is " + resp.statusText + " with HTTP status code " + resp.status);
    }
    catch (e) {
        console.log("An error occurred: " + e.message);
    }
}
