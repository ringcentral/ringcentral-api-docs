require 'ringcentral'

# Read phone number(s) that belongs to the authenticated user and detect if a phone number
# has the SMS capability
def detect_sms_feature()
  begin
    endpoint = "/restapi/v1.0/account/~/extension/~/phone-number"
    resp = $platform.get(endpoint)
    for record in resp.body['records'] do
      for feature in record['features'] do
        if feature == "SmsSender"
          puts ("This phone number " + record['phoneNumber'] + " has SMS feature")
        end
      end
    end
    if resp.body['records'].length == 0
      puts ("This user does not own a phone number!")
    end
  rescue StandardError => e
    puts (e)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    detect_sms_feature()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
