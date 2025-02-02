require 'ringcentral'
require 'json'

#
# Read all call monitoring groups
#
def read_call_monitoring_groups()
    begin
        endpoint = "/restapi/v1.0/account/~/call-monitoring-groups"
        resp = $platform.get(endpoint)
        jsonObj = resp.body
        for group in jsonObj['records'] do
            puts ("Call monitoring group name: " + group['name'] + "/"+ group['id'])
            read_call_monitoring_group_members(group['id'])
        end
    rescue StandardError => e
      puts ("Unable to call list call monitoring groups." + e.to_s)
    end
end
#
# Read a call monitoring group members
#
def read_call_monitoring_group_members(groupId)
    begin
        endpoint = "/restapi/v1.0/account/~/call-monitoring-groups/" + groupId + "/members"
        resp = $platform.get(endpoint)
        jsonObj = resp.body
        puts ("Call monitoring group members:")
        for member in jsonObj['records'] do
            puts JSON.pretty_generate(member)
        end
    rescue StandardError => e
        puts ("Unable to read members of this call monitoring group." + e.to_s)
    end
end


# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    read_call_monitoring_groups()
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
