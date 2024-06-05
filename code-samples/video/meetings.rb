require 'ringcentral'
require 'dotenv'
# Remember to modify the path to where you saved your .env file!
Dotenv.load("./../.env")

# Create an instant RCV MyMeeting
def create_meeting()
  begin
    bodyParams = {
          name: "Test meeting",
          type: "Instant"
      }
    endpoint =  "/rcvideo/v2/account/~/extension/~/bridges"
    resp = $platform.post(endpoint, payload: bodyParams)
    puts "Start your meeting: " + resp.body['discovery']['web']
  rescue StandardError => e
    puts (e)
  end
end

# Instantiate the SDK and get the platform instance
$platform = RingCentral.new( ENV['RC_CLIENT_ID'], ENV['RC_CLIENT_SECRET'], ENV['RC_SERVER_URL'] )

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize(jwt: ENV['RC_JWT'])
    create_meeting()
  rescue StandardError => e
    puts ("Unable to authenticate this user. Check credentials." + e.to_s)
  end
end

login()
