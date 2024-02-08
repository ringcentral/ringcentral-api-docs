require 'ringcentral'

#
# Read agent active calls
#
def read_agent_active_calls(agentExtensionId, supervisorDeviceId)
    begin
      endpoint = "/restapi/v1.0/account/~/extension/" + agentExtensionId + "/active-calls"
      resp = $platform.get(endpoint)
      jsonObj = resp.body
      for record in jsonObj['records'] do
        if (record['result'] == "In Progress")
          submit_call_supervise_request(record['telephonySessionId'], agentExtensionId, supervisorDeviceId)
          break
        end
      end
    rescue StandardError => e
      puts ("Unable to read agent's active calls. " + e.to_s)
    end
end

#
# Get active call session status
#
def read_active_call_session_status(telephonySessionId, agentExtensionId, supervisorDeviceId)
    begin
      endpoint = "/restapi/v1.0/account/~/telephony/sessions/" + telephonySessionId
      resp = $platform.get(endpoint)
      jsonObj = resp.body
      for record in jsonObj['records'] do
        if (record['result'] == "In Progress")
          submit_call_supervise_request(record['telephonySessionId'], agentExtensionId, supervisorDeviceId)
          break
        end
      end
    rescue StandardError => e
      puts ("Unable to read agent's active calls. " + e.to_s)
    end
end


#
# Supervise an active call session
#
def submit_call_supervise_request(telephonySessionId, agentExtensionId, supervisorDeviceId)
    begin
        endpoint = "/restapi/v1.0/account/~/telephony/sessions/" + telephonySessionId + "/supervise"
        bodyParams = {
                       mode: "Listen",
                       supervisorDeviceId: supervisorDeviceId,
                       agentExtensionId: agentExtensionId,
                     }
        resp = $platform.post(endpoint, payload: bodyParams)
        jsonObj = resp.body
        puts (jsonObj)
    rescue StandardError => e
      puts ("Unable to supervise this call. " + e.to_s)
    end
end


# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "SANDBOX-JWT" )
    supervisorDeviceId = "Test-Supervisor-DeviceId"
    agentExtensionId = "Test-Agent-ExtensionId"
    read_agent_active_calls(agentExtensionId, supervisorDeviceId)
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
