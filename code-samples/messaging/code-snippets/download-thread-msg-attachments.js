var platform = require('./../quick-start.js').platform;


list_messages()




// Next line must be at the 10th line!
platform.on(platform.events.loginSuccess, function(e){
    list_messages()
});

platform.on(platform.events.loginError, function(e){
    console.log("Unable to authenticate to platform. Check credentials.", e.message)
    process.exit(1)
});

/*
  Read thread messages
*/
async function list_messages(){
  try{
    let queryParams = {
      // threadStatus: "Open",
      // threadId: "...",
      // ownerExtensionIds: ["..."],
      // messageIds: ["..."],
      // creationTimeFrom: "...",
      // creationTimeTo: "...",
      perPage: 10
    }

    let endpoint = `/restapi/v1.0/account/~/message-threads/messages`
    var resp = await platform.get(endpoint, queryParams)
    var jsonObj = await resp.json()
    for (let msg of jsonObj.records){
      // Parse and handle the message data

      // Check if this message has attachment(s)
      if (msg.attachments.length)
        await get_message_attachments(msg.attachments)
    }
  }catch(e){
    console.log(await e.message)
  }
}

/*
  Download attachment(s) and save to a local file
*/
async function get_message_attachments(attachments){
  let fs = require('fs')
  try {
    for (var attachment of attachments){
      var fileName = attachment.filename
      let resp = await platform.get(attachment.contentUri)
      let buffer = await resp.buffer()
      fs.writeFileSync(fileName, buffer)
    }
  }catch(e){
    console.log(e.message)
  }
}
