const fs = require ('fs')
var platform = require('./../quick-start.js').platform;
NGROK_ADDRESS = process.env.NGROK_URL // "http://d973-73-170-11-87.ngrok-free.app"
WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
CONTENT_URI = 'https://rclabs-addin-resources.s3.us-east-1.amazonaws.com/media/Phong-Swetha-01.mp3'
speakers_identification()


// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    NGROK_ADDRESS = "NGROK-TUNNEL-ADDRESS"
    WEBHOOK_URL = NGROK_ADDRESS + "/webhook";
    CONTENT_URI = "PUBLICLY-ACCESSIBLE-CONTENT-URI"
    speakers_identification()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Identify speakers from a conversation
*/
async function speakers_identification() {
    let enrolledSpeakerIds = await read_enrolled_speakers()
    if (enrolledSpeakerIds.length > 0){
      try {
        let bodyParams = {
            contentUri:   CONTENT_URI,
            encoding:     "Mpeg",
            languageCode: "en-US",
            source:       "RingCentral",
            audioType:    "CallCenter",
            speakerIds:   enrolledSpeakerIds
        }
        let endpoint = `/ai/audio/v1/async/speaker-identify?webhook=${WEBHOOK_URL}`
        let resp = await platform.post(endpoint, bodyParams);
        let jsonObj = await resp.json();
        if (resp.status == 202) {
          console.log("Job ID: " + jsonObj.jobId);
          console.log("Ready to receive response at: " + WEBHOOK_URL);
        }
      } catch (e) {
          console.log(`Unable to call speaker identify API. ${e.message}`);
      }
    }else{
      console.log("No enrolled speakers. Please enroll a few speaker ids and try again.")
    }
}

/*
* Read the account enrolled speakers
*/
async function read_enrolled_speakers() {
  var enrolledSpeakerIds = []
  try{
    let queryParams = {
        partial: false,
        perPage: 100,
        page: 1
    }
    let endpoint = "/ai/audio/v1/enrollments"
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    for (var enrollment of jsonObj.records){
      enrolledSpeakerIds.push(enrollment.speakerId)
    }
  }catch (e){
    console.log("Unable to find enrolled speakers.", e.message)
  }
  return enrolledSpeakerIds
}
