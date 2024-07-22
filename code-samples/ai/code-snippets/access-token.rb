require 'ringcentral'

# Authenticate a user using a personal JWT token
def login()
  begin
    $platform.authorize( jwt: "RC_USER_JWT" )
    tokens = $platform.token
    contentUri = "https://media.ringcentral.com/restapi/.../recording/1662272004/content?access_token=" + tokens['access_token']
    # ...
  rescue StandardError => e
    puts ("Unable to authenticate to platform. Check credentials. " + e.to_s)
  end
end
