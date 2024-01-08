var platform = require('./../quick-start.js').platform;
NGROK =process.env.NGROK_URL
WEBHOOK_URL = NGROK + "/webhook";
punctuation()




// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    NGROK = "NGROK-TUNNEL-ADDRESS"
    WEBHOOK_URL = NGROK + "/webhook";
    punctuation()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Add punctuation to text paragraphs
*/
async function punctuation() {
  try {
      let bodyParams = {
          texts: [
              "so its more fluid than it is and you know its not the best kind of feedback right",
              "and you know that the best way to ask for customer feedback is to reach out to each of your customer and interview them separately",
              "however interviewing each individual customer to get their feedback is not scalable if you have thousands of customers to be interviewed"
          ]
      }
      let endpoint = `/ai/text/v1/async/punctuate?webhook=${WEBHOOK_URL}`
      let resp = await platform.post(endpoint, bodyParams)
      var jsonObj = await resp.json()
      if (resp.status == 202) {
        console.log("Job ID: " + jsonObj.jobId);
        console.log("Ready to receive response at: " + WEBHOOK_URL);
      }
  }
  catch (e) {
      console.log("Unable to call the punctuation API.", e.message)
  }
}
