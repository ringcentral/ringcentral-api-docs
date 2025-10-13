require 'ringcentral'

#
# Read existing rules
#
def read_user_workhours_state_rules()
  begin
    endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours'
    resp = $platform.get(endpoint)
    jsonObj = resp.body()
    update_user_workhours_state_rules(jsonObj['dispatching'])
  rescue StandardError => e
    puts ("Unable to read user Work-Hours state rules. " + e.to_s)
  end
end

#
# Update the Work-Hours state rules with new values
#
def update_user_workhours_state_rules(dispatching)
  begin
    # new phone number forwarding target
    newTarget = {
      "type" => "RingGroupAction",
      "enabled" => true,
      "targets" => [
        {
          "type" => "PhoneNumberRingTarget",
          "destination" => {
            "phoneNumber" => "+13121234567"
          },
          "name" => "Temporary number"
        }
      ],
      "duration" => 25 # 5 rings
    }
    dispatching["actions"].unshift(newTarget)
    
    bodyParams = {
          dispatching: dispatching
        }
    endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/voice/state-rules/work-hours'
    resp = $platform.patch(endpoint, payload: bodyParams)
    puts(resp.body)
  rescue StandardError => e
    puts ("Unable to update user Work-Hours state rules. " + e.to_s)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    read_user_workhours_state_rules()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
