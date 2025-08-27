#
# Receive inbound messages from WebSocket subscription event notification
#
def on_notification(message):
    # send_reply(message[1]['body'])
    download_mms_attachments(message[1]['body']['attachments'])

#
# Download an MMS message attachments
#
def download_mms_attachments(attachments):
    refresh_token()
    for attachment in attachments:
        fileName = str(attachment['id'])
        if attachment['type'] == "MmsAttachment":
            fileNameExt = attachment['contentType'].split("/")
            fileName = ("%s.%s" % (fileName, fileNameExt[1]))
            try:
                res = platform.get(attachment['uri'])
                with open(fileName, 'wb') as file:
                    file.write(res.body())
                    file.close()
            except ApiException as e:
                print (e.getMessage())
