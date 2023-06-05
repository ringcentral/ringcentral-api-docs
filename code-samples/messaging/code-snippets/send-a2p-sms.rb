require 'ringcentral'

# Read phone number(s) that belongs to the authenticated user and detect if a phone number
# has the A2P SMS capability
def read_extension_phone_number_detect_a2psms_feature()
  begin
    endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
    resp = $platform.get(endpoint)
    for record in resp.body['records'] do
      for feature in record['features'] do
        if feature == "A2PSmsSender"
          # If a user has multiple phone numbers, check and decide which number
          # to be used for sending SMS message.
          return send_batch_sms(record['phoneNumber'])
        end
      end
    end
    if resp.body['records'].length == 0
      puts ("This user does not own a phone number!")
    else
      puts("None of this user's phone number(s) has the A2P SMS capability!")
    end
  rescue StandardError => e
    puts (e)
  end
end

#
# Broadcast a text message from a user own phone number to multiple recipients
#
def send_batch_sms(fromNumber)
  begin
    bodyParams = {
        'from': fromNumber,
        'text': "Hello Team",
        'messages': [
          { 'to': [RECIPIENT] }
        # Adding more recipients
        # { 'to': [ "Recipient-2-Phone-Number"] },
        #	{ 'to': [ "Recipient-N-Phone-Number"] }
        #
        ]
    }

    endpoint = "/restapi/v1.0/account/~/a2p-sms/batches"
    resp = $platform.post(endpoint, payload: bodyParams)
    puts ("Batch sent. Batch id: " + resp.body['id'])
    check_batch_status(resp.body['id'])
  rescue StandardError => e
    puts (e)
  end
end

#
# Send a batch from a user own phone number to multiple recipient with personalized message
#
def send_personalized_sms(fromNumber)
  begin
    bodyParams = {
        'from': fromNumber,
        # This text becomes the default text and can be obmitted, if the text in a recipient object is not specified, this text will be used
        'text': "Hello Team",
        'messages': [
          { 'to': [RECIPIENT], 'text': "Hello Alice" }
        # Adding more recipients
        # { 'to': [ "Recipient-2-Phone-Number"], 'text': "Hello Bob" },
        #	{ 'to': [ "Recipient-N-Phone-Number"], 'text': "Hola Maria" }
        #
        ]
    }

    endpoint = "/restapi/v1.0/account/~/a2p-sms/batches"
    resp = $platform.post(endpoint, payload: bodyParams)
    puts ("Batch sent. Batch id: " + resp.body['id'])
    check_batch_status(resp.body['id'])
  rescue StandardError => e
    puts (e)
  end
end

#
# Check the batch status until it's completed.
# Sending a large batch will take some time for the server to complete. You can read a batch status using the batch id returned in the response after sending a batch.
#
def check_batch_status(batchId)
  begin
    endpoint =  "/restapi/v1.0/account/~/a2p-sms/batches/" + batchId
    resp = $platform.get(endpoint)
    puts ("Batch status: " + resp.body['status'])
    if (resp.body['status'] != "Completed")
        sleep (5)
        check_batch_status(resp.body['id'])
    else
        puts JSON.pretty_generate(JSON.parse(resp.body.to_json))
    end
  rescue StandardError => e
    puts (e)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "PRODUCTION_JWT" )
    read_extension_phone_number_detect_a2psms_feature()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
