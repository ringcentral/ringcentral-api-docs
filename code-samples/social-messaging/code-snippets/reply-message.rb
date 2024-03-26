require 'ringcentral'

# Reply to a message
def reply_message(messageId)
  begin
    bodyParams = {
          'inReplyToContentId': messageId,
          'body': "Thank you for your message! Ruby",
          'autoSubmitted': true,
          'public': false
      }
    endpoint = "/cx/social-messaging/v1/contents"
    resp = $platform.post(endpoint, payload: bodyParams)
    puts JSON.pretty_generate(JSON.parse(resp.body.to_json))
  rescue StandardError => e
    puts ("Unable to reply to this message. " + e.to_s)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_JWT" )
    reply_message("A-Valid-Message-Id")
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
