var platform = require('./../quick-start.js').platform;
read_high_volume_message_store()






// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    read_high_volume_message_store()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Read the high volume message store.
*/
async function read_high_volume_message_store(){
  try{
    let queryParams = {
      view: "Simple",
      dateFrom: "2023-01-01T00:00:00.000Z",
      dateTo: "2023-04-30T23:59:59.999Z",
      //phoneNumber: ["+16505550100"],
      direction: ["Inbound"]
    }
    let endpoint = "/restapi/v1.0/account/~/a2p-sms/messages"
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    for (var record of jsonObj.records)
      console.log(record)
      //console.log(JSON.stringify(jsonObj))
  }catch(e){
    console.log("Error message:", e.message())
  }
}


/*
  List sent batches.
*/
async function list_sent_batches(){
  try{
    let queryParams = {
      dateFrom: "2023-01-01T00:00:00.000Z",
      dateTo: "2023-01-31T23:59:59.999Z"
    }
    let endpoint = "/restapi/v1.0/account/~/a2p-sms/batches"
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj))
  }catch(e){
    console.log("Error message:", e.message())
  }
}

/*
  Read individual batch.
*/
async function read_individual_batch(){
  try{
    let endpoint = `/restapi/v1.0/account/~/a2p-sms/batches/${batchId}`
    var resp = await platform.get(endpoint)
    var jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj))
  }catch(e){
    console.log("Error message:", e.message())
  }
}

/*
  Read message statuses.
*/
async function read_message_statuses(){
  try{
    var queryParams = {
      batchId: '8ba42748-0e48-4459-8262-342a7483xxxx'
    }
    let endpoint = "/restapi/v1.0/account/~/a2p-sms/statuses"
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj))
  }catch(e){
    console.log("Error message:", e.message())
  }
}

/*
  Read message statuses.
*/
async function read_individual_message(){
  try{
    let endpoint = `/restapi/v1.0/account/~/a2p-sms/messages/${messageId}`
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    console.log(JSON.stringify(jsonObj))
  }catch(e){
    console.log("Error message:", e.message())
  }
}
