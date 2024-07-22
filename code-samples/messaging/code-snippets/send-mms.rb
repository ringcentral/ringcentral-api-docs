require 'ringcentral'

# Read phone number(s) that belongs to the authenticated user and detect if a phone number
# has the MMS capability
def read_extension_phone_number_detect_mms_feature()
  begin
    endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
    resp = $platform.get(endpoint)
    for record in resp.body['records'] do
      for feature in record['features'] do
        if feature == "MmsSender"
          # If a user has multiple phone numbers, check and decide which number
          # to be used for sending MMS message.
          return send_mms(record['phoneNumber'])
        end
      end
    end
    if resp.body['records'].length == 0
      puts ("This user does not own a phone number!")
    else
      puts("None of this user's phone number(s) has the MMS capability!")
    end
  rescue StandardError => e
    puts (e)
  end
end

# Send a multi-media message from a user own phone number to a recipient number
def send_mms(fromNumber)
  begin
    bodyParams = {
          from: { phoneNumber: fromNumber },
          to: [{ phoneNumber: RECIPIENT }],
          # To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
          #
          #to: [
          #       { phoneNumber: "Recipient1-Phone-Number" },
          #       { phoneNumber: "Recipient2-Phone-Number" }
          #     ],
          text: 'Hello World'
      }
    files = [
              ['test.jpg', 'image/jpeg']
            ]

    endpoint =  "/restapi/v1.0/account/~/extension/~/sms"
    resp = $platform.post(endpoint, payload: bodyParams, files: files)
    puts ("MMS sent. Message id: " + resp.body['id'].to_s)
    check_mms_message_status(resp.body['id'])
  rescue StandardError => e
    puts (e)
  end
end

# Check the sending message status until it's out of the queued status
def check_mms_message_status(messageId)
  begin
    endpoint = "/restapi/v1.0/account/~/extension/~/message-store/" + messageId.to_s
    resp = $platform.get(endpoint)
    puts ("Message status: " + resp.body['messageStatus'])
    if (resp.body['messageStatus'] == "Queued")
      sleep(5)
      check_mms_message_status(resp.body['id'])
    end
  rescue StandardError => e
    puts (e)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    read_extension_phone_number_detect_mms_feature()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
