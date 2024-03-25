require 'ringcentral'
require 'dotenv/load'

# Remember to modify the path to where you saved your .env file!
Dotenv.load("./../.env")

#
# Read user call log between a period of time
#
def read_user_calllog()
  begin
    endpoint = "/restapi/v1.0/account/~/extension/~/call-log"
    queryParams = {
      'dateFrom': "2024-01-01T00:00:00.000Z",
      'dateTo': "2024-01-31T23:59:59.009Z",
      'view': "Detailed"
    }
    resp = $platform.get(endpoint, queryParams)
    for record in resp.body['records'] do
        puts JSON.pretty_generate(record)
    end
  rescue StandardError => e
    puts ("Unable to read user call log. " + e.to_s)
  end
end

# Instantiate the SDK and get the platform instance
$platform = RingCentral.new( ENV['RC_CLIENT_ID'], ENV['RC_CLIENT_SECRET'], ENV['RC_SERVER_URL'] )

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize(jwt: ENV['RC_JWT'])
    read_user_calllog()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end

login()
##############################
# End of quick start section
##############################
