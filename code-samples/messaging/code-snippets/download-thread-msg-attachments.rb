require 'ringcentral'

#
# Read thread messages
#
def list_messages()
  begin
    query_params = {
      # threadStatus: "Open",
      # threadId: "...",
      # ownerExtensionIds: ["..."],
      # messageIds: ["..."],
      # creationTimeFrom: "...",
      # creationTimeTo: "...",
      perPage: 100
    }

    endpoint = "/restapi/v1.0/account/~/message-threads/messages"

    resp = $platform.get(endpoint, query_params)
    for msg in resp.body['records'] do
      # Parse and handle the message data

      # Check if this message has attachment(s)
      if msg["attachments"] && !msg["attachments"].empty?
        get_message_attachments(msg["attachments"])
      end
    end
  rescue StandardError => e
    puts e.message
  end
end

#
# Download attachment(s) and save to a local file
#
def get_message_attachments(attachments)
  begin
    for attachment in attachments
      fileName = attachment['filename']
      begin
        res = $platform.get(attachment['contentUri'])
        file = File.open(fileName, "w")
        file.write(res.body)
      rescue IOError => e
        puts e.getMessage()
      end
    end
  rescue StandardError => e
    puts (e)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    list_messages()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
