require 'ringcentral'

# List all identities
def list_identities(pageToken)
  begin
    queryParams = {
      'perPage': 10
    }
    if pageToken != ""
      queryParams['pageToken'] = pageToken
    end

    endpoint = "/cx/social-messaging/v1/identities"
    resp = $platform.get(endpoint, queryParams)
    jsonObj = resp.body
    for record in jsonObj['records'] do
      puts (JSON.pretty_generate(record))
    end
    # To read the next page, check and use the nextPageToken in the paging object.
    if jsonObj['paging']['nextPageToken'] and jsonObj['paging']['nextPageToken'] != ""
      pageToken = jsonObj['paging']['nextPageToken']
      # Make sure not to exceed the API rate limit of 40 API calls per minute
      sleep(1.2)
      puts ("Read identities from the next page.")
      list_identities(pageToken)
    else
      puts ("Done! No more next page.")
    end
  rescue StandardError => e
    puts ("Unable to read identities. " + e.to_s)
  end
end

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_JWT" )
    list_identities("")
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end
