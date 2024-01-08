var platform = require('./../quick-start.js').platform;
check_task_status("40ec5fa6-a5b9-11ee-8e20-0050568c77d0")






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    check_task_status("JOBID")
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Check speech to text job status
*/
async function check_task_status(jobId) {
  try{
    var endpoint = `/ai/status/v1/jobs/${jobId}`
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj))
  }catch (e){
    console.log("Unable to get speech to text job status.", e.message)
  }
}
