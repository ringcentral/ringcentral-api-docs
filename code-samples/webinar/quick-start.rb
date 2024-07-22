#!usr/bin/ruby

# You get the environment parameters from your
# application dashbord in your developer account
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

$rc = RingCentral.new(ENV['RC_APP_CLIENT_ID'],
                      ENV['RC_APP_CLIENT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_USER_JWT'])

def create_webinar()
  resp = $rc.post('/webinar/configuration/v1/webinars', payload: {
	title: "My first webinar",
	description: "This webinar was created via the Webinar Quick Start guide for developers"
    })

  puts "Webinar created. Message status: " + resp.body['messageStatus']
end

create_webinar()
