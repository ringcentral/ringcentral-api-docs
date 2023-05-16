require 'ringcentral'
require 'dotenv'
# Remember to modify the path to where you saved your .env file!
Dotenv.load("./../.env")

# For the purpose of testing the code, we put the SMS recipient number in the environment variable.
# Feel free to set the SMS recipient directly.
RECIPIENT    = ENV['SMS_RECIPIENT']

# Read phone number(s) that belongs to the authenticated user and detect if a phone number
# has the SMS capability
def read_extension_phone_number_detect_sms_feature()
  begin
    endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
    resp = $platform.get(endpoint)
    for record in resp.body['records'] do
      for feature in record['features'] do
        if feature == "SmsSender"
          # If user has multiple phone numbers, check and decide which number
          # to be used for sending SMS message.
          return send_sms(record['phoneNumber'])
        end
      end
    end
    if resp.body['records'].length == 0
      puts ("This user does not own a phone number!")
    else
      puts("None of this user's phone number(s) has the SMS capability!")
    end
  rescue StandardError => e
    puts (e)
  end
end

# Send a text message from a user own phone number to a recipient number
def send_sms(fromNumber)
  begin
    bodyParams = {
          from: { phoneNumber: fromNumber },
          to: [{ phoneNumber: RECIPIENT }],
          # To send group messaging, add more (max 10 recipients) 'phoneNumber' object. E.g.
          #
          #to: [
          #       { phoneNumber: RECIPIENT },
          #       { phoneNumber: 'Recipient-Phone-Number' }
          #     ],
          text: 'Hello World!'
      }
    endpoint =  "/restapi/v1.0/account/~/extension/~/sms"
    resp = $platform.post(endpoint, payload: bodyParams)
    puts ("SMS sent. Message id: " + resp.body['id'].to_s)
    check_message_status(resp.body['id'])
  rescue StandardError => e
    puts (e)
  end
end

# Check the sending message status until it's out of the queued status
def check_message_status(messageId)
  begin
    endpoint = "/restapi/v1.0/account/~/extension/~/message-store/" + messageId.to_s
    resp = $platform.get(endpoint)
    puts ("Message status: " + resp.body['messageStatus'])
    if (resp.body['messageStatus'] == "Queued")
      sleep(2)
      check_message_status(resp.body['id'])
    end
  rescue StandardError => e
    puts (e)
  end
end

# Instantiate the SDK and get the platform instance
$platform = RingCentral.new( ENV['RC_CLIENT_ID'], ENV['RC_CLIENT_SECRET'], ENV['RC_SERVER_URL'] )

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize(jwt: ENV['RC_JWT'])
    read_extension_phone_number_detect_sms_feature()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end

login()
##############################
# End of quick start section
##############################


########
# Code snippet section for boostrap testing purpose
########
def boostrap_test_function()

    # sleep(2)
    # puts "Test sending mms"
    # require_relative './code-snippets/send-mms'
    # read_extension_phone_number_detect_mms_feature()
    # return
    # sleep(2)
    # puts "Test sending Fax"
    # require_relative './code-snippets/send-fax'
    # send_fax()
    #
    # sleep(2)
    # puts "Test reading message store"
    # require_relative './code-snippets/message-store'
    # read_extension_message_store()
    #
    # sleep(2)
    # puts "Test reading number features"
    # require_relative './code-snippets/number-features'
    # detect_sms_feature()

    # sleep(2)
    # puts "Test export message store"
    # require_relative './code-snippets/message-store-export'
    # create_message_store_report()

    sleep(2)
    puts "Test sending batch sms"
    require_relative './code-snippets/send-a2p-sms'
    read_extension_phone_number_detect_a2psms_feature()
end

boostrap_test_function()
