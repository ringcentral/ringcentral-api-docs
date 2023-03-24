#!usr/bin/ruby

# You get the environment parameters from your 
# application dashbord in your developer account 
# https://developers.ringcentral.com

require 'ringcentral'
require 'dotenv/load'

$rc = RingCentral.new(ENV['RC_CLIENT_ID'],
                      ENV['RC_CLIENRT_SECRET'],
                      ENV['RC_SERVER_URL'])

$rc.authorize(jwt: ENV['RC_JWT'])

response = $rc.get('/restapi/v1.0/account/~/call-queues')
for group in response.body['records'] do
    if group['name'] == "Support Department"
	params = {
	  addedExtensionIds: ["888888888", "999999999"]
	}
	response = $rc.post('/restapi/v1.0/account/~/call-queues/'+group['id']+'/bulk-assign',
                            payload: params)
	puts response.status
	break
    end
end
