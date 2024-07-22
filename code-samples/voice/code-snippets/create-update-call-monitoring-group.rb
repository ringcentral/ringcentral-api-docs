require 'ringcentral'
require 'json'

#
# Create a call monitoring group
#
def create_call_monitoring_group(groupName)
    begin
        bodyParams = {
            'name': groupName
        }
        endpoint = "/restapi/v1.0/account/~/call-monitoring-groups"
        resp = $platform.post(endpoint, payload: bodyParams)
        jsonObj = resp.body
        puts ("Call monitoring group created: " + jsonObj['name'] + "/" + jsonObj['id'])
        add_call_monitoring_group_members(jsonObj['id'])
    rescue StandardError => e
      puts ("Unable to create a call monitoring groups." + e.to_s)
    end
end

#
# Add members to a call monitoring group
#
def add_call_monitoring_group_members(groupId)
    begin
        newMembersList = read_account_extensions()
        bodyParams = {
            'addedExtensions': newMembersList
        }
        endpoint = "/restapi/v1.0/account/~/call-monitoring-groups/" + groupId + "/bulk-assign"
        resp = $platform.post(endpoint, payload: bodyParams)
        jsonObj = resp.body
        puts ("Members added")
    rescue StandardError => e
        puts ("Unable to read members of this call monitoring group." + e.to_s)
    end
end

#
# Read the account user extensions and create a list of supervisors and agents based on their role.
#
def read_account_extensions()
    begin
        queryParams = {
            'type': ["User"],
            'status': "Enabled"
        }
        endpoint = '/restapi/v1.0/account/~/extension'
        resp = $platform.get(endpoint, queryParams)
        jsonObj = resp.body
        extensionList = []
        for user in jsonObj['records'] do
            extension = {
                'id': user['id'],
                'permissions': []
              }
            if user['permissions']['admin']['enabled'] == true
                extension['permissions'] = ["Monitoring"]
            else
                extension['permissions'] = ["Monitored"]
            end
            extensionList << extension
        end
        return extensionList
    rescue StandardError => e
        puts ("Unable to read company extensions." + e.to_s)
    end
end

#
# Delete a call monitoring group
#
def delete_call_monitoring_group(groupId)
    begin
        endpoint = "/restapi/v1.0/account/~/call-monitoring-groups/" + groupId
        resp = $platform.delete(endpoint)
        puts ("Call monitoring group deleted")
    rescue StandardError => e
        puts ("Unable to delete this call monitoring group." + e.to_s)
    end
end


# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    create_call_monitoring_group("Demo Group - Ruby")
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
