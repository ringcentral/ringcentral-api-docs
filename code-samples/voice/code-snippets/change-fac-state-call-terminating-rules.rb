require 'ringcentral'

#
# Read existing rules
#
def read_user_fac_state_rules()
  begin
    endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls'
    resp = $platform.get(endpoint)
    jsonObj = resp.body()
    update_user_fac_state_rules(jsonObj['dispatching'])
  rescue StandardError => e
    puts ("Unable to read user FAC state rules. " + e.to_s)
  end
end

#
# Update rules with new values
#
def update_user_fac_state_rules(dispatching)
  begin
    # Find the "TerminatingAction" object from the dispatching actions list
    action = dispatching['actions'].find { |a| a["type"] == "TerminatingAction" }
    if action
      # Change the terminating target type
      action['terminatingTargetType'] = "PlayAnnouncementTerminatingTarget"
      bodyParams = {
          dispatching: dispatching
        }
      endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/forward-all-calls'
      resp = $platform.patch(endpoint, payload: bodyParams)
      puts(resp.body)
    end
  rescue StandardError => e
    puts ("Unable to update user FAC state rules. " + e.to_s)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    read_user_fac_state_rules()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
