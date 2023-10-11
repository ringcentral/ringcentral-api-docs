var platform = require('./../quick-start.js').platform;
var contentFile = process.env.ENROLLMENT_CONTENT_2
enrollment(contentFile)





// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    // set your valid audio content file name and path
    let contentFile = "VALID_AUDIO_CONTENT_FILE"
    enrollment(contentFile)
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Enroll a speaker id
*/
async function enrollment(contentFile) {
  try{
    // use own extension id as a unique enrollment id
    let tokens = await platform.auth().data()
    let enrollmentId = tokens.owner_id

    const fs = require('fs')
    const base64data = fs.readFileSync(contentFile, {encoding: 'base64'})
    console.log(base64data.length)
    let endpoint = "/ai/audio/v1/enrollments"

    // check if this speaker id exists
    let enrollment = await read_enrollment(enrollmentId)
    if (enrollment){
      // speaker id exists => update it
      console.log("Existing enrollment", enrollment)
      let bodyParams = {
              encoding: "Mpeg", // Change the encoding if not an MP3 or MP4 file!
              languageCode: "en-US", // Change language code if not English US
              content: base64data
            }
      var resp = await platform.patch(`${endpoint}/${enrollmentId}`, bodyParams)
    }else{
      // speaker id does not exist => enroll a new one
      let bodyParams = {
              encoding: "Mpeg", // Change the encoding if not an MP3 or MP4 file!
              languageCode: "en-US",
              content: base64data,
              enrollmentId: enrollmentId
            }
      let endpoint = "/ai/audio/v1/enrollments"
      var resp = await platform.post(endpoint, bodyParams)
    }
    var jsonObj = await resp.json()
    console.log("New enrollment", jsonObj)
  }catch (e){
    console.log("Unable to enroll speaker identification.", e.message)
  }
}

/*
* Read a speaker id
*/
async function read_enrollment(enrollmentId) {
  try{
    let endpoint = `/ai/audio/v1/enrollments/${enrollmentId}`
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    return jsonObj
  }catch (e){
    console.log("Unable to find this speaker identification.", e.message)
    return null
  }
}
