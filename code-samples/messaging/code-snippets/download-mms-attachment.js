/*
*  Receive inbound messages from WebSocket subscription event notification
*/
subscription.on(subscription.events.notification, async function(msg) {
  // send_reply(msg.body)
  download_mms_attachments(msg.body.attachments)
});

/*
  Download an MMS message attachments
*/
const fs = require('fs')
async function download_mms_attachments(attachments){
  await refresh_token()
  for (var attachment of attachments){
    if (attachment.type == "MmsAttachment"){
      let contentType = attachment.contentType.split("/")
      let fileName = `${attachment.id}.${contentType[1]}`
      let res = await platform.get(attachment.uri)
      await res.body.pipe(fs.createWriteStream(fileName))
    }
  }
}
