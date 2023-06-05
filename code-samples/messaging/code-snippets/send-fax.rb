require 'ringcentral'

# Send a high resolution fax message to a recipient number
def send_fax()
  begin
    bodyParams = {
      to: [{ phoneNumber: RECIPIENT }],
      # To send fax to multiple recipients, add more 'phoneNumber' object. E.g.
      #
      # to: [
      #       { phoneNumber: "Recipient1-Phone-Number" },
      #       { phoneNumber: "Recipient2-Phone-Number" }
      # ],
      faxResolution: "High",
      coverPageText: "This is a demo Fax page from Ruby"
    }
    files = [
              ['test.jpg', 'image/jpeg']
            ]

    endpoint =  "/restapi/v1.0/account/~/extension/~/fax"
    resp = $platform.post(endpoint, payload: bodyParams, files: files)
    puts ("Fax sent. Message id: " + resp.body['id'].to_s)
    check_fax_message_status(resp.body['id'])
  rescue StandardError => e
    puts (e)
  end
end

# Check the sending message status until it's out of the queued status
def check_fax_message_status(messageId)
  begin
    endpoint = "/restapi/v1.0/account/~/extension/~/message-store/" + messageId.to_s
    resp = $platform.get(endpoint)
    puts ("Message status: " + resp.body['messageStatus'])
    if (resp.body['messageStatus'] == "Queued")
      sleep(10)
      check_fax_message_status(resp.body['id'])
    end
  rescue StandardError => e
    puts (e)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "SANDBOX_JWT" )
    send_fax()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
