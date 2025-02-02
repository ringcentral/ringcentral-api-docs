require 'ringcentral'
require 'dotenv'
# Remember to modify the path to where you saved your .env file!
Dotenv.load("./../.env")

#
# Create a new public team in Team Messaging with 2 members including the team owner
#
def create_team()
  begin
    bodyParams = {
      'public': true,
      'name': "Ruby Team",
      # Add internal members using their extension ids
      # Get your user extension id by calling the /restapi/v1.0/account/~/extension endpoint!
      'members': [{ 'id': "590490017"}, { 'id': "595861017"}],
      # You can also add members using their email address, especially for guest members who are not under your account company.
      # 'members': [{'email': "member.1@gmail.com"}, { 'email': "member.2@gmail.com"}, {'id': "[extensionId]"}],
      'description': "Let's talk about Ruby"
    }
    endpoint = "/team-messaging/v1/teams"
    resp = $platform.post(endpoint, payload: bodyParams)
    puts resp.body
  rescue StandardError => e
    puts ("Unable to create a new team. " + e.to_s)
  end
end

# Instantiate the SDK and get the platform instance
$platform = RingCentral.new( ENV['RC_APP_CLIENT_ID'], ENV['RC_APP_CLIENT_IDCLIENT_SECRET'], ENV['RC_SERVER_URL'] )

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize(jwt: ENV['RC_USER_JWT'])
    create_team()
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
    # puts "Test creating compliance export task"
    # require_relative './code-snippets/compliance-export'
    # create_compliance_export_task()

    # sleep(2)
    # puts "Test reading teams"
    # require_relative './code-snippets/list-teams'
    # list_teams("")

    sleep(2)
    puts "Test adding new team members"
    require_relative './code-snippets/add-team-members'
    find_team("", "Ruby Team")
end

boostrap_test_function()
