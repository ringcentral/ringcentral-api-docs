var platform = require('./../quick-start.js').platform;
read_supervisor_devices()






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, () => {
    read_supervisor_devices()
})

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
* Read active calls
*/
let supervisorDeviceId = ""
async function read_supervisor_devices(){
  try{
    let endpoint = "/restapi/v1.0/account/~/extension/~/device"
    let resp = await platform.get(endpoint)
    let jsonObj = await resp.json()
    for (var record of jsonObj.records){
      // If the supervisor has multiple device, decide which device to be used for the supervision purpose!
      if (record.status == "Online"){
        supervisorDeviceId = record.id
        break
      }
    }
  }catch(e) {
    console.log("Unable to read supervisor's devices.", e.message)
  }
}
