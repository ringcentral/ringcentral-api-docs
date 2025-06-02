require 'ringcentral'

#
# Set user forward-all-calls state schedule
#
def set_user_fac_state_schedule()
  begin
    bodyParams = {
        'enabled': true,
        'conditions': [ {
            'type': "Schedule",
            'schedule': {
              'triggers': [ {
                'triggerType': "Range",
                'ranges': [ {
                    'startDateTime': "2025-07-04T00:00:00",
                    'endDateTime': "2025-07-05T08:00:00"
                  } ]
              } ]
            }
          } ]
        }
    endpoint = '/restapi/v2/accounts/~/extensions/~/comm-handling/states/forward-all-calls'
    resp = $platform.patch(endpoint, payload: bodyParams)
    puts(resp.body)
  rescue StandardError => e
    puts ("Unable to set user FAC state schedule. " + e.to_s)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    set_user_fac_state_schedule(agentExtensionId, supervisorDeviceId)
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
