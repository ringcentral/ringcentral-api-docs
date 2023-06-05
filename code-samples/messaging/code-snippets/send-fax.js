var platform = require('./../quick-start.js').platform;
var RECIPIENT    = require('./../quick-start.js').RECIPIENT;
send_fax()





// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    send_fax()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
 Send a high resolution fax message to a recipient number
*/
async function send_fax() {
  try {
    var FormData = require('form-data');
    formData = new FormData();
    var bodyParams = {
        to: [{ 'phoneNumber': RECIPIENT }],
        // To send fax to multiple recipients, add more 'phoneNumber' object. E.g.
        /*
        to: [
           { phoneNumber: "Recipient1-Phone-Number" },
           { phoneNumber: "Recipient2-Phone-Number" }
         ],
        */
        faxResolution: 'High',
        coverPageText: "This is a demo Fax page from Node JS"
    }

    formData.append('json', new Buffer.from(JSON.stringify(bodyParams)), {
        filename: 'request.json',
        contentType: 'application/json'
    });

    formData.append('attachment', require('fs').createReadStream('test.jpg'));

    let endpoint = "/restapi/v1.0/account/~/extension/~/fax"
    var resp = await platform.post(endpoint, formData)
    var jsonObj = await resp.json()
    console.log("FAX sent. Message id: " + jsonObj.id)
    check_fax_message_status(jsonObj.id)
  } catch(e) {
    console.log(e.message)
  }
}


/*
 Check the sending message status until it's out of the queued status
*/
async function check_fax_message_status(messageId){
    try {
        let endpoint = `/restapi/v1.0/account/~/extension/~/message-store/${messageId}`
        let resp = await platform.get(endpoint);
        let jsonObj = await resp.json()
        console.log("Message status: ", jsonObj.messageStatus)
        if (jsonObj.messageStatus == "Queued"){
          await sleep (10000);
          check_fax_message_status(jsonObj.id);
        }
    } catch (e) {
      console.log(e.message)
    }
}

const sleep = async (ms) => {
  await new Promise(r => setTimeout(r, ms));
}
