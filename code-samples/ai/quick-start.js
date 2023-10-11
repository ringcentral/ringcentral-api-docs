const RC = require('@ringcentral/sdk').SDK
const fs = require('fs')
const path = require('path')
// Remember to modify the path of your .env file location!
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// Initialize the RingCentral SDK and Platform
const rcsdk = new RC({
    'server':       process.env.RC_SERVER_URL,
    'clientId':     process.env.RC_CLIENT_ID,
    'clientSecret': process.env.RC_CLIENT_SECRET
});
var platform = rcsdk.platform();

/* Authenticate a user using a personal JWT token */
platform.login({ 'jwt':  process.env.RC_JWT })

platform.on(platform.events.loginSuccess, function(e){
    //speech_to_text()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Convert speech to text
*/
async function speech_to_text() {
  try {
    let bodyParams = {
        'contentUri':               process.env.CONTENT_URI,
        'encoding':                 "Wav",
        'languageCode':             "en-US",
        'source':                   "RingCentral",
        'audioType':                "CallCenter",
        'enablePunctuation':        true,
        'enableSpeakerDiarization': true
    }
    let callbackAddress = `${process.env.NGROK_URL}/webhook`
    let endpoint = `/ai/audio/v1/async/speech-to-text?webhook=${callbackAddress}`
    let resp = await platform.post(endpoint, bodyParams);
  	let jsonObj = await resp.json();
    if (resp.status == 202) {
      console.log("Job ID: " + jsonObj.jobId);
      console.log("Ready to receive response at: " + callbackAddress);
    } else {
      console.log("An error occurred posting the request.");
    }
  } catch (e) {
    console.log("An error occurred : " + e.message);
  }
}
// End of Quick Start Code Section

/**********************************************************
***********************************************************
 TEST SECTION - THESE FUNTIONS ARE NOT SHOWN IN DEV GUIDE
***********************************************************
 Code snippet section for boostrap testing purpose
**********************************************************/
const sleep = async (ms) => {
  await new Promise(r => setTimeout(r, ms));
}

exports.platform = platform;

boostrap_test_function()
async function boostrap_test_function(){
  console.log("boostrap_test_function")

  // await sleep(2000)
  // console.log("Test Check Task")
  // require ('./code-snippets/check-task.js')
  // return

  await sleep(2000)
  console.log("Test Analyze Interaction")
  require ('./code-snippets/interactions.js')
  return
  //
  // await sleep(2000)
  // console.log("Test Enrollment Speaker Identification")
  // require ('./code-snippets/enrollment.js')
  // return

  await sleep(2000)
  console.log("Test Summarization")
  require ('./code-snippets/summarize.js')
  return

  await sleep(2000)
  console.log("Test Speaker Diarization")
  require ('./code-snippets/speaker-diarization.js')
  return


  await sleep(2000)
  console.log("Test Speaker Identification")
  require ('./code-snippets/speaker-identifier.js')
  return

  await sleep(2000)
  console.log("Test Enrollment Extra")
  require ('./code-snippets/enrollment-extra.js')
  return
}
