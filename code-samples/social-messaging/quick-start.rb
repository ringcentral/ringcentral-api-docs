require 'ringcentral'
require 'dotenv'
require 'json'

# Remember to modify the path to where you saved your .env file!
Dotenv.load("./../.env")

#
#  List contents from all connected channels
#
def list_contents(pageToken)
    queryParams = {
      'perPage': 50
    }
    if pageToken != ""
      queryParams['pageToken'] = pageToken
    end

    endpoint = "/cx/social-messaging/v1/contents"
    begin
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
        puts ("Read contents from the next page.")
        list_contents(pageToken)
      else
        puts ("Done! No more next page.")
      end
    rescue StandardError => e
      puts ("Unable to call list contents API. " + e.to_s)
    end
end

# Instantiate the SDK and get the platform instance
$platform = RingCentral.new( ENV['RC_APP_CLIENT_ID'], ENV['RC_APP_CLIENT_SECRET'], "https://platform.ringcentral.com" )

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize(jwt: ENV['RC_USER_JWT'])
    list_contents("")
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials." + e.to_s)
  end
end

login()
##############################
# End of quick start section
##############################


########
# Code snippet section for boostrap testing purpose
########
def boostrap_test_function()

    # sleep(2)
    # puts "Test reply message"
    # require_relative './code-snippets/reply-message'
    # reply_message("65ef2ffea757720007399854")

    sleep(2)
    puts "Test list identities"
    require_relative './code-snippets/list-identities'
    list_identities("")
end

boostrap_test_function()
