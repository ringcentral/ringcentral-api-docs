require 'ringcentral'

#
# List teams under an account. Read 10 teams at a time.
#
def list_teams(pageToken)
  begin
    queryParams = {
      'recordCount': 10,
      'pageToken': pageToken
    }
    endpoint = "/team-messaging/v1/teams"
    resp = $platform.get(endpoint, queryParams)
    jsonObj = resp.body

    # List teams API returns a list of teams in the ascending order based on team creation date and time.
    # I.e. from older team to newer team
    for record in jsonObj['records'] do
        puts("The team \"" + record['name'] + "\" was created on " + record['creationTime'])
    end
    # To read the next page, check and use the previous page token in the navigation object.
    if jsonObj['navigation']['prevPageToken']
      pageToken = jsonObj['navigation']['prevPageToken']
      # Make sure not to exceed the API rate limit of 40 API calls per minute
      sleep(1.2)
      puts ("Read newer teams ...")
      list_teams(pageToken)
    end
  rescue StandardError => e
    puts ("Unable to read teams. " + e.to_s)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    list_teams("")
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
