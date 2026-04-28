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
          return send_batch_with_group_messaging(record['phoneNumber'])
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
# Send a batch with multiple group messaging. Recipients in the same group will see each other's phone numbers.
#
def send_batch_with_group_messaging(fromNumber)
  begin
    bodyParams = {
          from: {phoneNumber: fromNumber},
          text: "",
          messages: [
              {
                  to: [
                      {phoneNumber: "Recipient-1"},
                      {phoneNumber: "Recipient-2"},
                      {phoneNumber: "Recipient-3"}
                  ],
                  text: "Work with your group to discuss and complete the assignment A by 1:00 PM."
              },
              {
                  to: [
                      {phoneNumber: "Recipient-A"},
                      {phoneNumber: "Recipient-B"},
                      {phoneNumber: "Recipient-C"}
                  ],
                  text: "Work with your group to discuss and complete assignment B by 3:00 PM."
              },
              {
                  to: [
                      {phoneNumber: "Recipient-X"},
                      {phoneNumber: "Recipient-Y"},
                      {phoneNumber: "Recipient-Z"}
                  ],
                  text: "Work with your group to discuss and complete the assignment C by 6:00 PM."
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
