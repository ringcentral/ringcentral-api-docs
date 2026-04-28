require 'ringcentral'

# Read phone number(s) that belongs to the authenticated user and detect if a phone number
# has the SMS capability
def read_extension_phone_number_detect_sms_feature()
  begin
    endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
    resp = $platform.get(endpoint)
    for record in resp.body['records'] do
      for feature in record['features'] do
        if feature == "SmsSender"
          # If a user has multiple phone numbers, check and decide which number
          # to be used for sending the batch message.
          return send_batch_sms(record['phoneNumber'])
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
# Broadcast a text message from a user own phone number to multiple recipients
#
def send_batch_sms(fromNumber)
  begin
    bodyParams = {
      from: { phoneNumber: fromNumber },
      text: "Holiday Hours: Great news! Our shop will be open during the holiday from 10 AM–6 PM. Stop by and see us!",
      messages: [
        { to: [ { phoneNumber: "Recipient-1-Phone-Number" } ] },
        { to: [ { phoneNumber: "Recipient-2-Phone-Number" } ] },
        { to: [ { phoneNumber: "Recipient-N-Phone-Number" } ] }
      ]
    }
    endpoint = "/restapi/v2/accounts/~/extensions/~/sms/batches"
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
    read_extension_phone_number_detect_sms_feature()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
