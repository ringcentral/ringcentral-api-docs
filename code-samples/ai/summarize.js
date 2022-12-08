const RC = require('@ringcentral/sdk').SDK;
require('dotenv').config();

// replace with your ngrok address below
const WEBHOOK_ADDRESS = "YOUR NGROK HTTPS URL" + "/webhook"; 

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
    conversationSummarization();
});

async function conversationSummarization() {
    try {
        console.log("Calling RingCentral Conversational Summarization API");
        let resp = await platform.post("/ai/text/v1/async/summarize?webhook=" + WEBHOOK_ADDRESS, {
            "summaryType": "Extractive",
            "utterances": [
                {
                    "text": "A knowledge base is an online support library that contains useful information 
                             about your product or service and any related topics. Commonly referred to as 
                             a 'self-service' solution, a knowledge base lets your customers find answers 
                             to their support questions without having to speak to a person on your team 
                             (and taking up their precious time).  A knowledge base can include any variety 
                             of resources that help customers get the most from a product or service, 
                             including how-to guides, video tutorials, FAQs, white papers, case studies, 
                             and even user forums.  Unlike marketing materials and onboarding sequences, 
                             knowledge bases provide comprehensive and detailed information about all 
                             aspects of a company's products and customer service.  For example, you might 
                             include in-depth documentation about how to troubleshoot different product 
                             issues, as well as knowledge base articles explaining your payment structures 
                             and refund policies."
                }
            ]
        });
        console.log("Converation Summarization Job " + resp.statusText + " with HTTP status code " + resp.status);
    } 
    catch (e) {
        console.log("An Error Occurred : " + e.message);
    }
}
