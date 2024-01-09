var platform = require('./../quick-start.js').platform;
read_enrollments()






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    read_enrollments()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Read speakers id
*/
async function read_enrollments() {
  try{
    let queryParams = {
        partial: true,
        perPage: 100,
        page: 1
    }
    let endpoint = "/ai/audio/v1/enrollments"
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    console.log(jsonObj)
  }catch (e){
    console.log("Unable to read speakers identification.", e.message)
  }
}

/*
* Delete a speaker id
*/
async function delete_enrollment(speakerId) {
  try{
    let endpoint = `/ai/audio/v1/enrollments/${speakerId}`
    var resp = await platform.delete(endpoint)
    console.log("Deleted")
  }catch (e){
    console.log("Unable to delete a speaker identification.", e.message)
  }
}
