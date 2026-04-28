require 'ringcentral'

# Read phone number(s) that belongs to the authenticated user and detect if a phone number
# has the A2P SMS capability
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
# Send a batch to multiple recipient with personalized message
#
def send_personalized_sms(fromNumber)
  begin
    bodyParams = {
          from: { phoneNumber: fromNumber},
          text: "",
          messages: [
            {
              to: [ {phoneNumber: "Recipient-1-Phone-Number"}],
              text: "Hi Tom, your appointment with Dr. Lee is scheduled for tomorrow at 10AM."
            },
            {
              to: [ {phoneNumber: "Recipient-2-Phone-Number"} ],
              text: "Hi Jenn, your appointment with Dr. Derick is scheduled for tomorrow at 9AM."

            },
            {
              to: [ {phoneNumber: "Recipient-n-Phone-Number"} ],
              text: "Hi Laurence, your appointment with Dr. Derick is scheduled for tomorrow at 1PM."
            }
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
