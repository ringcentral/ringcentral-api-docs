require 'ringcentral'
require 'subscription'

#
#  Subscribe for the user instant message event notification
#
def subscribe_for_instant_messages_notification()
  events = [
    '/restapi/v1.0/account/~/extension/~/message-store/instant?type=SMS'
  ]
  subscription = WS.new($platform, events, lambda { |message|
    send_reply(message['body'])
  })
  subscription.subscribe()
  puts "Waiting for incoming SMS message ..."
  while 1
      sleep(5)
  end
end

#
# Send a reply message to a client number
#
def send_reply(body)
  begin
    textMessage = "Hi"
    if body['from'].key?('name')
      text_message += " " + body['from']['name']
    end
    textMessage += "\nThank you for your message. I’m currently on vacation and will be available after August 15th."
    bodyParams = {
            from: {phoneNumber: body['to'][0]['phoneNumber'] },
            to: [ {phoneNumber: body['from']['phoneNumber']} ],
            text: textMessage
    }

    endpoint =  "/restapi/v1.0/account/~/extension/~/sms"
    refresh_token()
    resp = $platform.post(endpoint, payload: bodyParams)
  rescue StandardError => e
    puts (e)
  end
end

def refresh_token()
    if $platform.refresh() == nil
        puts "Both tokens expired => Relogin."
        $platform.authorize(jwt: "RC_USER_JWT")
    else
        puts "Token valid."
    end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize(jwt: "RC_USER_JWT")
    subscribe_for_instant_messages_notification()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
