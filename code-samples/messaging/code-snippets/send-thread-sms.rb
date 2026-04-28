require 'ringcentral'

# Read the shared phone number that currently assigned to the authenticated user and detect if a phone number
# has the SMS capability
def read_shared_phone_number_detect_sms_feature()
  begin
    endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
    resp = $platform.get(endpoint)
    for record in resp.body['records'] do
      # Find the "Financial Advising Queue" call queue's direct phone number
      if record.key?('extension') && record['extension']['name'] == "Financial Advising Queue"
        for feature in record['features'] do
          if feature == "SmsSender"
            send_thread_message(record['phoneNumber'])
            return
          end
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

#
# Send a thread message to a recipient phone number
#
def send_thread_message(fromNumber)
  begin
    bodyParams = {
      from: { phoneNumber: fromNumber },
      to: [ { phoneNumber: "Recipient-1-Phone-Number" } ],
      text: "Hi Tom ..."
    }
    endpoint = "/restapi/v1.0/account/~/message-threads/messages"
    resp = $platform.post(endpoint, payload: bodyParams)
    puts(resp.body)
  rescue StandardError => e
    puts (e)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    read_shared_phone_number_detect_sms_feature()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
