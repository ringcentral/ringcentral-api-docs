require 'ringcentral'
require 'dotenv'
require 'json'

# Remember to modify the path to where you saved your .env file!
Dotenv.load("./../.env")

CALLER    = ENV['RINGOUT_CALLER']
RECIPIENT = ENV['RINGOUT_RECIPIENT']

#
#  Place a ring-out call
#
def call_ring_out()
    bodyParams = {
        'from': { 'phoneNumber': CALLER },
        'to': { 'phoneNumber': RECIPIENT },
        'playPrompt': false
    }
    endpoint = "/restapi/v1.0/account/~/extension/~/ring-out"
    begin
      resp = $platform.post(endpoint, payload: bodyParams)
      body = resp.body
      puts "Call placed. Call status: " + resp.body['status']['callStatus']
    rescue StandardError => e
      puts ("Unable to place a ring-out call. " + e.to_s)
    end
end

# Instantiate the SDK and get the platform instance
$platform = RingCentral.new( ENV['RC_APP_CLIENT_ID'], ENV['RC_APP_CLIENT_SECRET'], ENV['RC_SERVER_URL'] )

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize(jwt: ENV['RC_USER_JWT'])
    #call_ring_out()
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
    # puts "Test create a call monitoring group"
    # require_relative './code-snippets/create-update-call-monitoring-group'
    # create_call_monitoring_group("Demo Group - Ruby")
    #
    # sleep(2)
    # puts "Test list call monitoring groups"
    # require_relative './code-snippets/call-monitoring-group'
    # read_call_monitoring_groups()

    sleep(2)
    puts "Test supervise call session"
    require_relative './code-snippets/call-supervision'
    supervisorDeviceId = "802636634016"
    agentExtensionId = "62295327016"
    read_agent_active_calls(agentExtensionId, supervisorDeviceId)
end

boostrap_test_function()
