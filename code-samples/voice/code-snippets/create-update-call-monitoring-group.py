from ringcentral import SDK
import json

#
# Create a call monitoring group
#
def create_call_monitoring_group(groupName):
    try:
        endpoint = "/restapi/v1.0/account/~/call-monitoring-groups"
        bodyParams = {
            'name': groupName
        }
        resp = platform.post(endpoint, bodyParams)
        jsonObj = resp.json()
        print (f'Call monitoring group created: {jsonObj.name}')
        add_call_monitoring_group_members(jsonObj.id)
    except Exception as e:
      print ("Unable to call list call monitoring groups." + str(e))

#
# Add members to a call monitoring group
#
def add_call_monitoring_group_members(groupId):
    try:
        newMembersList = read_account_extensions()
        bodyParams = {
            'addedExtensions': newMembersList
        }
        endpoint = f'/restapi/v1.0/account/~/call-monitoring-groups/{groupId}/bulk-assign'
        resp = platform.post(endpoint, bodyParams)
        print ("Members added")
    except Exception as e:
        print ("Unable to read members of this call monitoring group." + str(e))

#
# Read the account user extensions and create a list of supervisors and agents based on their role.
#
def read_account_extensions():
    try:
        queryParams = {
            'type': ["User"],
            'status' : "Enabled"
        }
        endpoint = '/restapi/v1.0/account/~/extension'
        resp = platform.get(endpoint, queryParams)
        jsonObj = resp.json()
        extensionList = []
        for user in jsonObj.records:
            extension = {
                'id': user.id,
                'permissions': []
              }
            if user.permissions.admin.enabled == True:
                extension['permissions'].append("Monitoring")
            else:
                extension['permissions'].append("Monitored")
            extensionList.append(extension)
        return extensionList
    except Exception as e:
        print ("Unable to read company extensions." + str(e))

#
# Delete a call monitoring group
#
def delete_call_monitoring_group(groupId):
    try:
        endpoint = f'/restapi/v1.0/account/~/call-monitoring-groups/{groupId}'
        resp = platform.delete(endpoint)
        print ("Call monitoring group deleted.")
    except Exception as e:
        print ("Unable to delete this call monitoring group." + str(e))

# Authenticate a user using a personal JWT token
def login():
  try:
      platform.login( jwt= "RC_USER_JWT" )
      create_call_monitoring_group("Demo Group - Python")
  except Exception as e:
      print ("Unable to authenticate to platform. Check credentials. " + str(e))
