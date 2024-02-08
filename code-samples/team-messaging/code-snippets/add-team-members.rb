require 'ringcentral'

#
# Find the team id of the team to be added new members
#
def find_team(pageToken, teamName)
    begin
        queryParams = {
          'recordCount': 10,
          'pageToken': pageToken
        }
        endpoint = "/team-messaging/v1/teams"
        resp = $platform.get(endpoint, queryParams)
        jsonObj = resp.body
        # Search through the team list to find the team
        puts ("Find the team id of \"" + teamName + "\"")
        for record in jsonObj['records'] do
            if (record['name'] == teamName)
              puts ("Add new members to team \"" + teamName + "\"")
              add_new_members(record['id'])
              return
            end
        end

        # To read the next page, check and use the previous page token in the navigation object.
        if jsonObj['navigation']['prevPageToken']
            pageToken = jsonObj['navigation']['prevPageToken']
            # Make sure not to exceed the API rate limit of 40 API calls per minute
            sleep(1.2)
            puts ("Read newer teams ...")
            find_team(pageToken, teamName)
        else
            puts ("Cannot find team " + teamName)
        end
    rescue StandardError => e
      puts ("Unable to read teams. " + e.to_s)
    end
end

#
# Add new members to a team identified by the team id
#
def add_new_members(teamId)
  begin
    bodyParams = {
        'members': [
            # replace the email addresses below with valid internal or external new member email address
            { 'email': "member.name@abc.com" },
            { 'email': "guest.name@xyz.com" }
        ]
    }
    endpoint = "/team-messaging/v1/teams/" + teamId + "/add"
    resp = $platform.post(endpoint, payload: bodyParams)
    puts ("New member(s) added. Response status " + resp.status().to_s)
  rescue StandardError => e
    puts ("Unable to add team members. " + e.to_s)
  end
end


# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "SANDBOX_JWT" )
    find_team("", "Ruby Team")
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
