#
#  Subscribe for the user instant message event notification
#
def subscribe_for_instant_messages_notification()
  events = [
    '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'
  ]
  #
  # Receive inbound messages from WebSocket subscription event notification
  #
  subscription = WS.new($platform, events, lambda { |message|
    # send_reply(message['body'])
    download_mms_attachments(message['body']['attachments'])
  })
  subscription.subscribe()
  puts "Waiting for incoming SMS/MMS messages ..."
  while 1
      sleep(5)
  end
end

#
# Download an MMS message attachments
#
def download_mms_attachments(attachments)
  refresh_token()
  for attachment in attachments
    if attachment["type"] == "MmsAttachment"
      file_name_ext = attachment["contentType"].split("/")
      file_name = "%s.%s" % [attachment["id"], file_name_ext[1]]
      begin
        res = $platform.get(attachment["uri"])
        File.open(file_name, "wb") { |file| file.write(res.body) }
      rescue IOError => e
        puts e.message
      end
    end
  end
end
