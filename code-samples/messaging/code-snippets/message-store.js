var platform = require('./../quick-start.js').platform;
read_extension_message_store()






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    read_extension_message_store()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Read the current authenticated user's message store.
*/
async function read_extension_message_store(){
  try {
    let queryParams = {
      dateFrom: '2023-01-01T00:00:00.000Z',
      dateTo: '2023-01-31T23:59:59.999Z',
      messageType: ['SMS', 'Fax'],
      perPage: 1000
    }
    let endpoint = "/restapi/v1.0/account/~/extension/~/message-store"
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    for (var record of jsonObj.records){
        console.log(record)
    }
  } catch (e){
    console.log("Error message:", e.message())
  }
}
